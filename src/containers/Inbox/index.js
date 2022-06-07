import * as React from 'react';
import { InboxConversation } from './InboxConversation';
import { InboxChat } from './InboxChat';
import WebSocketInstance from '../../websocket';
import { COMMAND } from '../../common/socketCommands';
import { connect } from 'react-redux';
import ConversationForm from '../../components/Form/ConversationForm';
import { InboxProjects } from './InboxProjects';
import { CHAT_TYPES, ROLES } from '../../common/constants';
import Notify from '../../components/Notification';
import { uploadFile } from '../../store/actions/fileActions';
import dispatchConversation from '../../store/actions/conversationAction';
import { isEmpty } from '../../helpers';
import { throttle } from 'lodash';
import {
  createChat,
  fetchChatList,
  fetchMessages,
  pushNewMessage,
  sendTypingSignal,
  setChatID
} from '../../store/actions/inboxActions';
import './index.scss';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocketInstance();
    this.socket.addCallbacks([
      { type: COMMAND.newMessage, callback: this.props.pushNewMessage },
      { type: COMMAND.sendTypingSignal, callback: this.props.sendTypingSignal }
    ]);
    this.state = {
      showNewConversation: false
    };
  }

  async componentDidMount() {
    const { newUser, setChatID, fetchChatList, selectedChatId } = this.props;

    window.scrollTo(0, 0);

    const chatList = await fetchChatList({ limit: 100, page: 1 }, !newUser && !selectedChatId);

    if (chatList && !chatList.list.length && !selectedChatId) {
      this.toggleConversation(true);
    } else if (newUser && chatList.list) {
      const res = chatList.list
        .map(i => {
          return i.id === newUser.value ? i.id : i.participant.id === newUser.value && i.id;
        })
        .filter(i => i);
      if (!isEmpty(res)) setChatID(res[0]);
      else this.toggleConversation(true);
    }

    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedChatId &&
      (this.props.selectedChatId !== prevProps.selectedChatId || !this.socket.socketRef)
    ) {
      this.socket.disconnect();
      this.socket.connect(this.props.selectedChatId);
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
    const { setChatID } = this.props;
    setChatID(null);
    this.props.conversation(null);
  }

  sendMessage = ({ message, attachments }) => {
    const { selectedChatId } = this.props;
    const { email } = this.props.user;
    if (selectedChatId && email) {
      const messageObject = {
        message,
        command: COMMAND.newMessage,
        from: email,
        chatId: `${selectedChatId}`,
        attachments: attachments.map(file => file.id)
      };

      if (this.socket.isOpen()) {
        this.socket.send(messageObject);
      }
    }
  };

  sendTypingSignal = throttle(() => {
    const { selectedChatId } = this.props;
    const { email } = this.props.user;
    if (selectedChatId && email) {
      const messageObject = {
        command: COMMAND.sendTypingSignal,
        from: email,
        chatId: `${selectedChatId}`
      };
      if (this.socket.isOpen()) {
        this.socket.send(messageObject);
      }
    }
  }, 1000);

  newConversationSubmit = async ({ to, message, attachments }) => {
    const { chatList, user, createChat, fetchChatList } = this.props;

    if (chatList.data) {
      if (!chatList.data.list.map(item => item.participant.id).includes(to)) {
        const chatObject = {
          room_type: CHAT_TYPES.user,
          message: message || null,
          attachments: attachments.map(file => file.id),
          author_id: user.id,
          participant_id: to
        };

        const res = await createChat(chatObject, true);
        await fetchChatList({ limit: 10, page: 1 });
        if (res && res.id) {
          this.props.setChatID(res.id);
          this.props.fetchMessages(res.id, { limit: 10, page: 1 });
        }
      }
    } else {
      Notify.info({ text: 'Check network connection' });
    }

    this.setState({ showNewConversation: false });
  };

  toggleConversation = show => {
    show !== undefined
      ? this.setState({ showNewConversation: show })
      : this.setState({ showNewConversation: !this.state.showNewConversation });
  };

  render() {
    const { user, uploadFile, chatList, projectChatList, newUser } = this.props;
    const isEmpty = chatList && chatList.data && !chatList.data.list.length;
    const isEmptyProjectChatList =
      projectChatList && projectChatList.data && !projectChatList.data.list.length;
    return (
      <div className="inbox">
        <InboxConversation
          disableToggle={isEmpty}
          toggleConversation={this.toggleConversation}
          showNewConversation={this.state.showNewConversation}
        />
        {this.state.showNewConversation ? (
          <ConversationForm
            newUser={newUser}
            onSubmit={this.newConversationSubmit}
            uploadFile={uploadFile}
            toggleConversation={this.toggleConversation.bind(this)}
          />
        ) : (
          <InboxChat onMessageSubmit={this.sendMessage} onTyping={this.sendTypingSignal} />
        )}
        <InboxProjects
          disableToggle={isEmptyProjectChatList}
          toggleConversation={this.toggleConversation}
          showNewConversation={this.state.showNewConversation}
          isCustomer={user && user.role === ROLES.customer}
          chatList={this.props.chatList}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  newUser: state.conversationStore.data,
  chatList: state.inboxStore.chatList,
  projectChatList: state.inboxStore.projectChatList,
  selectedChatId: state.inboxStore.selectedChatId
});

const mapDispatchToProps = dispatch => ({
  sendTypingSignal: message => dispatch(sendTypingSignal(message)),
  pushNewMessage: message => dispatch(pushNewMessage(message)),
  createChat: (chat, isSetChatId) => dispatch(createChat(chat, isSetChatId)),
  fetchChatList: (params, setDefault) => dispatch(fetchChatList(params, setDefault)),
  fetchMessages: (chatId, params) => dispatch(fetchMessages(chatId, params)),
  setChatID: id => dispatch(setChatID(id)),
  uploadFile: file => dispatch(uploadFile(file)),
  conversation: user => dispatch(dispatchConversation(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

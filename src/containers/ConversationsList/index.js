import * as React from 'react';
import { connect } from 'react-redux';
import InboxUserCard from '../../components/Cards/InboxUserCard';
import Preloader from '../../components/Preloader';
import { setChatID } from '../../store/actions/inboxActions';

class ConversationsList extends React.Component {
  render() {
    return <div className="inbox_conversation_list">{this.renderContent(this.props.chatList)}</div>;
  }

  onSelect = id => {
    this.props.setChatID(id);
    this.props.toggleConversation(false);
  };

  renderContent = ({ loading, data }) => {
    const { showNewConversation, selectedChatId } = this.props;

    if (loading) {
      return <Preloader className="inbox__preloader" />;
    }

    const userChatList = [...(data?.list || [])];
    const sortedUserChatList = [
      ...userChatList.filter(chat => chat.id === this.props.selectedChatId),
      ...userChatList.filter(chat => chat.id !== this.props.selectedChatId)
    ];
    return sortedUserChatList.map(conversation => {
      const { first_name, last_name, avatar, online, last_seen } = conversation.participant;
      return (
        <InboxUserCard
          key={conversation.id}
          lastName={last_name}
          active={!showNewConversation && conversation.id === selectedChatId}
          firstName={first_name}
          avatar={avatar}
          online={online}
          lastseen={last_seen}
          newMessagesCount={0}
          newMessage={conversation.new_message}
          onClick={() => this.onSelect(conversation.id)}
        />
      );
    });
  };
}

const mapStateToProps = state => ({
  chatList: state.inboxStore.chatList,
  newUser: state.conversationStore.data,
  selectedChatId: state.inboxStore.selectedChatId,
  user: state.userStore.user
});

const mapDispatchToProps = dispatch => ({
  setChatID: id => dispatch(setChatID(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);

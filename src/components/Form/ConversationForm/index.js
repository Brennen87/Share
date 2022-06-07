import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import EmojiPicker from '../../EmojiPicker';
import ContactListSelect from '../../ContactListSelect';
import { AttachmentPicker } from '../../AttachmentPicker';
import SmallButton from '../../UI/SmallButton';
import { Attachment } from '../../UI/Attachment';
import { setChatID } from '../../../store/actions/inboxActions';
import './index.scss';
import Preloader from '../../Preloader';

class ConversationForm extends React.Component {
  state = {
    to: '',
    message: '',
    files: [],
    attachments: [],
    value: '',
    option: '',
    options: '',
    isSubmit: false,
    isUploading: false
  };

  componentDidMount() {
    const { newUser } = this.props;
    if (newUser) {
      this.setState({ ...this.state, value: newUser, to: newUser.value });
    }
  }

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.to) {
      this.setState({ isSubmit: true });
      try {
        this.props.onSubmit(this.state);
        this.setState({ isSubmit: false });
      } catch (e) {
        console.log(e);
        this.setState({ isSubmit: false });
      }
    }
  };

  onContactSelect = option => {
    const toValue = (option && option.value) || '';

    const chatList = this.props.chatList?.data?.list;
    if (option && chatList && chatList.length) {
      const foundChat = chatList.find(chat => chat.participant.id === option.value);

      if (foundChat) {
        this.props.setChatID(foundChat.id);
        this.props.toggleConversation(false);
        return;
      }
    }

    this.setState({
      ...this.state,
      value: option || '',
      option: option || '',
      to: toValue,
      options: ''
    });
  };

  onContactSelectInput = option => {
    this.setState({ ...this.state, options: '', value: option });
  };

  onMessageChange = e => {
    this.setState({ ...this.state, message: e.target.value });
  };

  onEmojiPick = emoji => {
    this.setState({ ...this.state, message: this.state.message + emoji.native });
  };

  addAttachment = (e, currentAttachments) => {
    this.setState({ isUploading: true });
    const attachments = [...currentAttachments];
    Object.keys(e.target.files).map(index => {
      const file = new FormData();
      file.append('file', e.target.files[index]);
      this.props
        .uploadFile(file)
        .then(res => {
          res && res.id && attachments.push(res);
          this.setState({ attachments });
          document.querySelector('#attachment').value = null;
          this.setState({ isUploading: false });
        })
        .catch(error => {
          console.error(error);
          this.setState({ isUploading: false });
        });
      return index;
    });
  };

  removeAttachment = id => {
    this.setState({
      ...this.state,
      attachments: this.state.attachments.filter((file, index) => index !== id)
    });
  };

  getSearchResult = res => {
    this.setState({ options: res });
  };

  render() {
    const { isSubmit, option, options, value } = this.state;
    return (
      <form className="conversation" onSubmit={this.onSubmit}>
        <div className="conversation__inner">
          <div className="conversation_top">
            <div className="conversation_title">Start New Conversation</div>
          </div>
          <div className="conversation_main">
            <div className="conversation_main_list">
              <div className="conversation_item conversation__to">
                <div className="conversation__to_label">To</div>
                <ContactListSelect
                  value={value}
                  option={option}
                  options={this.getSearchResult}
                  onChange={this.onContactSelect}
                  onInputChange={this.onContactSelectInput}
                  className={classnames(!options.length && 'hide_menu', 'conversation__to_select')}
                />
              </div>
            </div>
            <div className="conversation_main_text">
              <textarea
                className="conversation_textarea"
                placeholder="Write your message..."
                name="message"
                value={this.state.message}
                onChange={this.onMessageChange}
              />
            </div>
          </div>
          <div className="conversation__attachments">
            {this.state.attachments.map((file, index) => (
              <Attachment
                key={index}
                title={file.name}
                onRemove={() => this.removeAttachment(index)}
              />
            ))}
          </div>
          <div className="conversation_bottom">
            <div className="conversation_bottom__item">
              <EmojiPicker onChange={this.onEmojiPick} />
              <AttachmentPicker
                onChange={event => this.addAttachment(event, this.state.attachments)}
                multiple
              />
              {this.state.isUploading ? <Preloader style={{ width: '30%' }} /> : null}
            </div>
            <div className="conversation_bottom__item">
              <SmallButton
                type="submit"
                onSubmit={this.onSubmit}
                className="conversation_button"
                label="Send"
                disabled={isSubmit}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  chatList: state.inboxStore.chatList
});
const mapDispatchToProps = dispatch => ({
  setChatID: id => dispatch(setChatID(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConversationForm);

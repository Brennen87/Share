import * as React from 'react';
import * as classnames from 'classnames';
import EmojiPicker from '../../EmojiPicker';
import SmallButton from '../../UI/SmallButton';
import { AttachmentPicker } from '../../AttachmentPicker';
import { Attachment } from '../../UI/Attachment';
import autosize from 'autosize';
import { doNothing } from '../../../helpers';
import Preloader from '../../Preloader';
import Notify from '../../Notification';
import './index.scss';

class CharForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      attachments: [],
      isUploading: false,
      isSubmit: false,
      isEmpty: false
    };

    this.textArea = React.createRef();
  }

  componentDidMount() {
    this.textArea.focus();
    autosize(this.textArea);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isEmpty && prevState.message !== this.state.message) {
      this.setState({ isEmpty: false });
    }

    if (!this.state.message) {
      this.textArea.style.height = '38px';
    }
  }

  onSubmit = async e => {
    e.preventDefault();

    if (
      this.state.message.includes("www") ||
      this.state.message.includes("http") ||
      this.state.message.includes(".com") ||
      this.state.message.includes(".net") ||
      this.state.message.includes(".org") ||
      this.state.message.includes(".io") ||
      this.state.message.includes("@")
    ) {
      Notify.info({ text: "You must not include websites, e-mail addresses or phone numbers in your description" });
      return;
    }

    if (this.state.message) {
      this.setState({ isSubmit: true });
      try {
        this.props.onSubmit(this.state);
        this.setState({ isSubmit: false });
      } catch (e) {
        console.log(e);
        this.setState({ isSubmit: false });
      }
      this.setState({ message: '', attachments: [], files: [] });
    } else {
      this.setState({ isEmpty: true });
    }
  };

  addEmoji = emoji => {
    // TODO implement emoji add logic
    const sym = emoji.unified.split('-');
    const codesArray = [];
    sym.forEach(el => codesArray.push(`0x${el}`));
    const emojiEncoded = String.fromCodePoint(...codesArray);
    this.setState({ message: this.state.message + emojiEncoded });
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

  inputChange = e => {
    this.props.onTyping();
    this.setState({ message: e.target.value });
  };

  onKeyPress = e => {
    if (!e.shiftKey && e.charCode === 13) {
      this.onSubmit(e);
    }
  };

  render() {
    const { isSubmit } = this.state;
    return (
      <form
        className={classnames(
          'chat_form',
          this.state.message.length === 2000 && 'chat_form__limit'
        )}
        onSubmit={this.onSubmit}
      >
        <div className="chat_form__top">
          <div className="chat_form__top_wrap">
            <span
              className="chat_form__top_line"
              style={{
                background: (this.state.message.length === 2000 || this.state.isEmpty) && '#ff0000'
              }}
            />
            <textarea
              ref={el => (this.textArea = el)}
              className={classnames(
                'chat_form__textarea',
                this.props.selectedChatIsClosed ? 'chat_form__textarea_disabled' : ''
              )}
              placeholder={
                this.props.selectedChatIsClosed
                  ? 'This project is closed.'
                  : 'Write your message...'
              }
              value={this.props.selectedChatIsClosed ? '' : this.state.message}
              onChange={this.props.selectedChatIsClosed ? doNothing : this.inputChange}
              onKeyPress={this.onKeyPress}
              maxLength={2000}
              disabled={this.props.selectedChatIsClosed}
            />
            <span
              className="chat_form__top_line"
              style={{
                background: this.state.message.length === 2000 || (this.state.isEmpty && '#ff0000')
              }}
            />
          </div>
        </div>
        <div className="chat_form__content">
          <div className="chat_form__left">
            <div
              className={classnames(
                'chat_form__attachments',
                !this.state.attachments && 'chat_form__attachments__active'
              )}
            >
              {this.state.attachments.map((file, index) => (
                <Attachment
                  key={index}
                  title={file.name}
                  onRemove={() => this.removeAttachment(index)}
                />
              ))}
            </div>
          </div>
          {!this.props.selectedChatIsClosed ? (
            <span className="chat_form__right">{`${this.state.message.length}/2000`}</span>
          ) : null}
        </div>
        <div className="chat_form__bottom">
          <div className="chat_form__buttons">
            <EmojiPicker
              onChange={this.props.selectedChatIsClosed ? doNothing : this.addEmoji}
              disabled={this.props.selectedChatIsClosed}
            />
            <AttachmentPicker
              onChange={
                this.props.selectedChatIsClosed
                  ? doNothing
                  : event => this.addAttachment(event, this.state.attachments)
              }
              disabled={this.props.selectedChatIsClosed}
              multiple
            />
            {this.state.isUploading ? <Preloader style={{ width: '30%' }} /> : null}
          </div>
          <SmallButton
            className="chat_form__submit_button"
            type="submit"
            label="Send"
            disabled={isSubmit || this.props.selectedChatIsClosed}
            onSubmit={this.props.selectedChatIsClosed ? doNothing : this.onSubmit}
          />
        </div>
      </form>
    );
  }
}

export default CharForm;

import EmojiPicker from '../../EmojiPicker';
import { AttachmentPicker } from '../../AttachmentPicker';
import SmallButton from '../../UI/SmallButton';
import * as React from 'react';
import * as classnames from 'classnames';
import { Attachment } from '../../UI/Attachment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import autosize from 'autosize';
import Notify from '../../Notification';
import Preloader from '../../Preloader';
import './index.scss';

const VALIDATION_SCHEMA = Yup.object().shape({
  attachments: Yup.array()
});

class DeliveryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      isMessageEmpty: false,
      message: ''
    };

    this.textArea = React.createRef();
  }

  componentDidMount() {
    this.textArea.focus();
    autosize(this.textArea);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isMessageEmpty && prevState.message !== this.state.message) {
      this.setState({ isMessageEmpty: false });
    }
  }

  addEmoji = (emoji, message, setFieldValue) => {
    const sym = emoji.unified.split('-');
    const codesArray = [];
    sym.forEach(el => codesArray.push(`0x${el}`));
    const emojiEncoded = String.fromCodePoint(...codesArray);
    setFieldValue('message', message + emojiEncoded);
  };

  addAttachment = (e, attachments, setFieldValue) => {
    this.setState({ isUploading: true });
    const files = [...attachments];
    Object.keys(e.target.files).map(index => {
      const file = new FormData();
      file.append('file', e.target.files[index]);
      this.props
        .uploadFile(file)
        .then(res => {
          res && res.id && files.push(res);
          setFieldValue('attachments', files);
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

  handleSubmitMessage = (e, isEmpty, handler) => {
    e.preventDefault();
    if (isEmpty) {
      return handler(e);
    }
    return this.setState({ isMessageEmpty: true });
  };

  handleMessage = (e, value, handler) => {
    this.setState({ message: value });
    return handler(e);
  };

  render() {
    const notTheFirst = !!this.props.deliveries?.length;

    return (
      <Formik
        onSubmit={(values, formikBag) =>
          this.props.onSubmit(values, formikBag).then(() => {
            this.textArea.style.height = '38px';
            return formikBag.resetForm();
          })
        }
        validationSchema={VALIDATION_SCHEMA}
        initialValues={{
          message: '',
          attachments: []
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue, isSubmitting, validateForm }) => (
          <form
            className={classnames('delivery_form', this.props.className)}
            onSubmit={e => this.handleSubmitMessage(e, values.message, handleSubmit)}
          >
            <div className="delivery_form__content">
              <div className="delivery_form__top">
                <span
                  className="delivery_form__top_line"
                  style={{ background: this.state.isMessageEmpty && '#ff0000' }}
                />
                <textarea
                  ref={el => (this.textArea = el)}
                  name="message"
                  className="delivery_form__textarea"
                  value={values.message}
                  onChange={e => this.handleMessage(e, values.message, handleChange)}
                  rows={10}
                  placeholder="Write your message..."
                />
                <span
                  className="delivery_form__top_line"
                  style={{ background: this.state.isMessageEmpty && '#ff0000' }}
                />
              </div>
              <div className="delivery_form__footer">
                <div className="delivery_form__buttons">
                  <EmojiPicker
                    onChange={emoji => this.addEmoji(emoji, values.message, setFieldValue)}
                  />
                  <AttachmentPicker
                    multiple
                    onChange={e => this.addAttachment(e, values.attachments, setFieldValue)}
                  />
                  {this.state.isUploading ? <Preloader style={{ width: '30%' }} /> : null}
                </div>
                <div className="delivery_form__attachments">
                  {values.attachments.map(file => (
                    <Attachment
                      key={file.id}
                      title={file.name}
                      onRemove={() =>
                        setFieldValue(
                          'attachments',
                          values.attachments.filter(attch => attch.id !== file.id)
                        )
                      }
                    />
                  ))}
                </div>
                <SmallButton
                  className="delivery_form__submit_button"
                  type="submit"
                  label={`Submit${notTheFirst ? ' Again' : ''}`}
                  onSubmit={handleSubmit}
                  onClick={() => {
                    validateForm().then(formErrors => {
                      if (Object.keys(formErrors).length) {
                        const rawMessage = formErrors[Object.keys(formErrors)[0]];
                        const text = rawMessage.charAt(0).toUpperCase() + rawMessage.slice(1);
                        Notify.info({ text });
                      }
                    });
                  }}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

export default DeliveryForm;

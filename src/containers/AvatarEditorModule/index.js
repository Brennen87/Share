import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import noAvatar from '../../assets/icons/icon_annonimous.svg';
import { updateProfileBasic } from '../../store/actions/profileActions';
import { fetchUserStatus } from '../../store/actions/authActions';
import './index.scss';

const SETTINGS = {
  allowedFormats: ['jpg', 'jpeg', 'png'],
  allowedSize: 10485760
};

class AvatarEditorModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      rescaledFile: null
    };
  }

  onFileChange = event => {
    const file = event.target.files[0];
    const sFileName = file.name;
    const sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
    const iFileSize = file.size;

    if (SETTINGS.allowedFormats.includes(sFileExtension) && iFileSize < SETTINGS.allowedSize) {
      this.props.setFieldValue('isUploaded', true);
      this.setState({
        ...this.state,
        selectedFile: event.target.files[0]
      });
    }
  };

  setEditorRef = editor => {
    this.props.setFieldValue('editorRef', editor);
  };

  removePhoto = async () => {
    try {
      await this.props.updateProfileBasic({ avatar: null })

      try {
        await this.props.fetchUserStatus(this.props.user);
      } catch (e) {
        console.error("Error loading user status");
        console.error(e);
      }
      this.props.setFieldValue('isUploaded', false);
      this.props.setFieldValue('avatar', null);
      this.props.setFieldValue('file', null);
    } catch (e) {
      // Do nothing. could not upload file.
        console.error("Error updating profile");
        console.error(e);
    }
  };

  render() {
    return (
      <div
        className={classnames(
          'avatar_editor__wrapper',
          this.props.isUploaded && 'avatar_editor__wrapper-active'
        )}
      >
        <div className="avatar_editor">
          <div className="gridline">
            <div className="gridline__inner" />
          </div>
          {this.state.selectedFile && this.props.isUploaded && this.props.isEditMode ? (
            <AvatarEditor
              ref={this.setEditorRef}
              image={this.state.selectedFile}
              style={{ width: '100%', height: '100%' }}
              width={800}
              height={800}
              border={0}
              color={[196, 196, 196]} // RGBA
              scale={1}
            />
          ) : (
            <div className="avatar_editor__static">
              <img src={this.props.avatar || noAvatar} alt="Avatar" />
              <label
                htmlFor="avatar"
                className={classnames(this.props.isEditMode && 'avatar_editor__camera')}
              >
                <svg
                  width="35"
                  height="27"
                  viewBox="0 0 35 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.9784 0H22.0216C22.6417 0 23.4555 0.403594 23.8372 0.90125L26.3222 4.56531C26.565 4.92187 26.9686 5.13844 27.3995 5.13844H32.7436C33.9905 5.13844 34.9989 6.15562 34.9989 7.41672V23.9717C34.9989 25.2306 33.9905 26.2511 32.7436 26.2511H2.25641C1.00953 26.2511 0 25.2328 0 23.9717V7.41672C0 6.15781 1.00953 5.13844 2.25641 5.13844H7.62234C8.03906 5.13844 8.42953 4.93062 8.66578 4.585L11.1617 0.90125C11.5445 0.404687 12.3616 0 12.9784 0ZM25.9678 7.99093C25.9678 8.62093 26.4731 9.13171 27.0965 9.13171C27.721 9.13171 28.2253 8.62093 28.2253 7.99093C28.2253 7.36093 27.721 6.84906 27.0965 6.84906C26.4731 6.84906 25.9678 7.36093 25.9678 7.99093ZM9.59654 15.4088C9.59654 19.821 13.1348 23.3975 17.5 23.3975C21.8651 23.3975 25.4023 19.821 25.4023 15.4088C25.4023 10.9955 21.8651 7.42002 17.5 7.42002C13.1348 7.42002 9.59654 10.9955 9.59654 15.4088ZM11.2908 15.4088C11.2908 11.9405 14.07 9.13175 17.5 9.13175C20.93 9.13175 23.7092 11.9405 23.7092 15.4088C23.7092 18.876 20.93 21.6858 17.5 21.6858C14.07 21.6858 11.2908 18.876 11.2908 15.4088Z"
                    fill="#044C5A"
                  />
                </svg>
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                className="avatar_editor__input"
                onChange={this.onFileChange}
                disabled={!this.props.isEditMode}
              />
            </div>
          )}
        </div>
        {this.props.isEditMode && (
          <button className="avatar_editor__remove" type="button" onClick={this.removePhoto}>
            Remove Photo
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
});

const mapDispatchToProps = dispatch => ({
  updateProfileBasic: userData => dispatch(updateProfileBasic(userData)),
  fetchUserStatus: user => dispatch(fetchUserStatus(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AvatarEditorModule);

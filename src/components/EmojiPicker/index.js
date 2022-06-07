import * as React from 'react';
import * as classnames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import { NimblePicker } from 'emoji-mart';
import data from 'emoji-mart/data/apple.json';
import { doNothing } from '../../helpers';

import 'emoji-mart/css/emoji-mart.css';
import './index.scss';

class EmojiPicker extends React.Component {
  state = {
    showEmojis: false
  };

  toggleDropdown = () => {
    this.setState({ showEmojis: !this.state.showEmojis });
  };

  onEmojiSelect = emoji => {
    this.props.onChange(emoji);
  };

  render() {
    return (
      <OutsideClickHandler
        onOutsideClick={() => this.setState({ showEmojis: false })}
        disabled={!this.state.showEmojis}
      >
        <div className="emoji_picker__wrapper">
          <div
            className={classnames(
              'emoji_picker__icon',
              this.props.disabled ? 'emoji_picker__icon_disabled' : ''
            )}
            onClick={this.props.disabled ? doNothing : this.toggleDropdown}
          />
          <div
            className={classnames(
              'emoji_picker__dropdown',
              !this.state.showEmojis && 'emoji_picker__dropdown_hidden'
            )}
          >
            <NimblePicker
              native={false}
              emojiTooltip={true}
              set="apple"
              data={data}
              showPreview={false}
              showSkinTones={false}
              style={{ width: '280px' }}
              onSelect={this.props.disabled ? doNothing : this.onEmojiSelect}
            />
          </div>
        </div>
      </OutsideClickHandler>
    );
  }
}

export default EmojiPicker;

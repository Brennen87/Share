import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

class TruncatedText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      shortText: '',
      size: this.props.length || 250,
      ellipsesText: this.props.ellipsesText || '...'
    };
  }

  componentDidMount() {
    const { truncate } = this.props;
    truncate && this.truncateText(this.props.text);
  }

  truncateText = text => {
    if (text && text.length > this.state.size) {
      const shortText = text.substr(0, this.state.size) + this.state.ellipsesText;
      this.setState({ ...this.state, shortText });
    }
  };

  render() {
    const { text, truncate, className } = this.props;

    if (!text) {
      return null;
    }

    return (
      <div className={classnames('truncated_text', className)}>
        {this.props.render(
          !this.state.shortText || !truncate || this.state.showMore ? text : this.state.shortText
        )}
        {truncate && this.state.shortText && (
          <span
            className="truncated_text__button"
            onClick={() => this.setState({ ...this.state, showMore: !this.state.showMore })}
          >
            {this.state.showMore ? 'Hide' : 'More'}
          </span>
        )}
      </div>
    );
  }
}

export default TruncatedText;

TruncatedText.propTypes = {
  text: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  className: PropTypes.string,
  truncate: PropTypes.bool,
  length: PropTypes.number,
  ellipsesText: PropTypes.string
};

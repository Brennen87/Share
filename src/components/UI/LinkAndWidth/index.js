import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

class LinkAndWidth extends React.Component {
  constructor(props) {
    super(props);
    this.targetRef = React.createRef();
  }

  componentDidMount() {
    if (this.targetRef.current) {
      this.props.getWidth(Math.floor(this.targetRef.current.offsetWidth));
    }
  }

  render() {
    const { label, onClick, hidden, last } = this.props;

    return (
      <div
        className={classnames('link_and_width', hidden && 'link_hidden')}
        ref={this.targetRef}
        onClick={onClick}
        style={{ display: 'inline-block' }}
      >
        <span className={classnames('link_and_width__label', last && 'link_and_width__label_last')}>
          {label}
        </span>
      </div>
    );
  }
}

export default LinkAndWidth;

LinkAndWidth.propTypes = {
  label: PropTypes.string.isRequired,
  getWidth: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

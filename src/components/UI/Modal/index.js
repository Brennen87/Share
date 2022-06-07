import React, { Component } from 'react';
import * as classnames from 'classnames';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import './index.scss';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.root = document.createElement('div');
    document.body.appendChild(this.root);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
    document.body.style.overflow = 'unset';
  }

  render() {
    return ReactDom.createPortal(
      <div className="modal__wrapper">
        <div className="modal">
          <div className={classnames('modal__content', this.props.className)}>
            <OutsideClickHandler onOutsideClick={this.props.onClose}>
              {this.props.children}
            </OutsideClickHandler>
          </div>
        </div>
      </div>,
      this.root
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default Modal;

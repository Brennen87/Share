import React from 'react';
import Button from '../../components/UI/Button';
import './index.scss';

const CancelProjectSuccessModal = ({ title, description, handleClick }) => {
  return (
    <div className="cancel_project__success_modal">
      <div className="cancel_project__success_modal__inner">
        <h1 className="cancel_project__success_modal__title">{title}</h1>
        <p className="cancel_project__success_modal__describe">{description}</p>
        <Button label="Go to Projects" onClick={() => handleClick()} />
      </div>
    </div>
  );
};

export default CancelProjectSuccessModal;

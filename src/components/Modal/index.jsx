import React from 'react';

// third-party labraries
import PropTypes from 'prop-types';

// style
import './Modal.scss';

const Modal = ({
  showModal = false,
  children,
  classes,
  closeModal,
}) => (
  <div className={`modal-container ${showModal ? 'modal-container__show' : ''}`} onClick={closeModal}>
    <div className={`modal-content ${showModal ? 'modal-content__show' : ''}`}>
      <div className={`modal-dialog ${classes}`} onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={closeModal}>
          <i className="fa fa-times-circle fa-3x"></i>
        </span>
       <div>
        {children}
       </div>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  classes: PropTypes.string,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
  ]).isRequired,
};

export default Modal;

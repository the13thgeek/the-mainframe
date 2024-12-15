import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ isOpen, onClose, children, footer }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Cleanup listener when component unmounts or modal closes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="modal-body">
          {children}
        </div>
        { footer && <div className="modal-footer">{footer}</div>}
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
      </div>
    </div>,
    document.getElementById('modal-root') // Make sure you have this div in your HTML
  );
};

export default Modal;

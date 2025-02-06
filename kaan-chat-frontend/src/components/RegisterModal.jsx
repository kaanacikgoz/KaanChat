import React from 'react';
import styles from "../styles/RegisterModal.module.css";

function Modal({ message, onClose, type }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={type === 'error' ? styles.errorMessage : styles.successMessage}>
          {message}
        </h3>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;

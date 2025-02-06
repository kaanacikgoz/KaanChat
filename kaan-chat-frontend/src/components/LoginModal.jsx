import React from 'react';
import styles from '../styles/LoginModal.module.css';

const Modal = ({ message, onClose, isSuccess }) => {
  if (!message) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{isSuccess ? 'Giriş Başarili' : 'Giriş Yapilamadi'}</h2>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

export default Modal;

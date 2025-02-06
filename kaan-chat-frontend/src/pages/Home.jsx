import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/Home.module.css";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
      <div className={styles['home-container']}>
        <h2>Welcome to Kaan Chat</h2>
        <div className={styles.buttons}>
          <button 
            onClick={() => handleNavigate('/register')} 
            className={styles['start-chat-button']}
          >
            Register
          </button>
          <button 
            onClick={() => handleNavigate('/login')} 
            className={styles['start-chat-button']}
          >
            Login
          </button>
        </div>
      </div>
    );

}

export default Home;
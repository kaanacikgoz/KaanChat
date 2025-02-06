import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import Modal from '../components/LoginModal';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await AuthService.login(username, password);

      if (response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);
        
        AuthService.setAuthToken(response.token);

        setMessage('Login successful! Redirecting...');
        setIsSuccess(true); 

        setTimeout(() => {
          navigate('/chat');
        }, 2000); 

      } else {
        setMessage('Invalid credentials');
      }
    } catch (err) {
      setMessage('Username or password is incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <Modal message={message} onClose={() => setMessage('')} isSuccess={isSuccess} />
    </div>
  );
}

export default Login;
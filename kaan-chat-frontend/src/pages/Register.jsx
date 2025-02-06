import React, { useState } from 'react';
import AuthService from "../services/AuthService";
import { useNavigate } from 'react-router-dom';
import styles from "../styles/Register.module.css";
import Modal from '../components/RegisterModal';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState({ message: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setStatus({ message: 'Kullanici adi ve şifre gereklidir.', type: 'error' });
      setIsModalOpen(true);
      return;
    }

    try {
      await AuthService.register(formData);
      setStatus({ message: 'Kayit başarili, giriş yapabilirsiniz!', type: 'success' });
      setIsModalOpen(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errorMsg = err.response?.data || 'Bilinmeyen bir hata oluştu.';
      setStatus({ message: errorMsg, type: 'error' });
      setIsModalOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button} disabled={!formData.username || !formData.password}>
          Register
        </button>
      </form>
      {isModalOpen && <Modal message={status.message} onClose={() => setIsModalOpen(false)} type={status.type} />}
    </div>
  );
}

export default Register;
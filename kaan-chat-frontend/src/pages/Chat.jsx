import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Chat.module.css';

function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [username, setUsername] = useState(null);
  const [client, setClient] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      console.log('LocalStorage\'da username bulunamadı, giriş sayfasına yönlendiriliyor...');
      navigate('/');
      return;
    }
    setUsername(storedUsername);
  
    if (!localStorage.getItem('token')) {
      navigate('/');
      return;
    }
  
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('WebSocket Connected');
        
        stompClient.subscribe('/topic/public', (message) => {
          const receivedMessage = JSON.parse(message.body);
  
          if (receivedMessage.type === 'JOIN' || receivedMessage.type === 'LEAVE') {
            setChatMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'System', content: `${receivedMessage.sender} ${receivedMessage.type === 'JOIN' ? 'girdi' : 'çikti'}.`, type: 'SYSTEM' },
            ]);
          } else {
            setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
          }
        });
  
        if (storedUsername && !isLoggingOut) {
          stompClient.publish({
            destination: '/app/chat.addUser',
            body: JSON.stringify({ sender: storedUsername, type: 'JOIN' }),
          });
        }
      },
      onDisconnect: () => {
        console.log('WebSocket Disconnected');
      },
      onStompError: (frame) => {
        console.error('STOMP Error:', frame);
      },
    });
  
    stompClient.activate();
    setClient(stompClient);
  
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [navigate, isLoggingOut]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const sendMessage = () => {
    if (!username) {
      console.error("Username bulunamadı, mesaj gönderilemez.");
      return;
    }

    if (client && client.connected && message.trim() !== '') {
      const chatMessage = {
        sender: username,
        content: message,
        type: 'CHAT',
      };

      client.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(chatMessage),
      });

      setMessage('');
    }
  };

  const logout = () => {
    if (client && client.connected) {
      setIsLoggingOut(true);
      client.publish({
        destination: '/app/chat.addUser',
        body: JSON.stringify({ sender: username, type: 'LEAVE' }),
      });
      
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername(null);
        setIsLoggingOut(false);
        navigate('/');
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Hoş Geldiniz, {username}!</h2>
        <button onClick={logout} className={styles.logoutButton}>
          {isLoggingOut ? (
            <div className={styles.spinner}></div>
          ) : (
            'Çıkış Yap'
          )}
        </button>
      </div>
  
      <div className={styles.chatBox}>
        <div className={styles.messageList}>
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                msg.type === 'SYSTEM'
                  ? styles.systemMessage
                  : msg.sender === username
                  ? styles.myMessage
                  : styles.otherMessage
              }`}
            >
              {msg.type === 'SYSTEM' ? (
                <div className={styles.text} style={{ textAlign: 'center' }}>
                  {msg.content}
                </div>
              ) : (
                <>
                  <div className={styles.sender}>{msg.sender}</div>
                  <div className={styles.text}>{msg.content}</div>
                </>
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Mesajınızı yazın..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.input}
          />
          <button onClick={sendMessage} className={styles.button}>
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
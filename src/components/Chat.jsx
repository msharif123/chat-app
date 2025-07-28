import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import styles from './Chat.module.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const fakeUser = {
    id: 'fake-user-123',
    username: 'Mohamed',
    avatar: 'https://i.pravatar.cc/100'
  };

  const user = {
    id: 'current-user-id',
    username: 'mohamed',
    avatar: 'https://i.pravatar.cc/100?u=current-user'
  };

  useEffect(() => {
    setMessages([{
      id: "5",
      text: "Hej hur kan vi hjälpa dig idag?",
      userId: fakeUser.id,
      user: fakeUser,
      createdAt: new Date(Date.now())
    }]);
  }, []);

  const handleSend = async (text) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      userId: user.id,
      user: user,
      createdAt: new Date(),
      isOwn: true
    };
    
    setIsSending(true);
    setMessages(prev => [...prev, userMessage]);

    // response 

    setTimeout(() => {
      const responses = [
        "Hur kan jag hjälpa dig?",
        "Tack för ditt meddelande!",
        "Vårt team återkommer till dig snart."
      ];
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        userId: fakeUser.id,
        user: fakeUser,
        createdAt: new Date(),
        isOwn: false
      };
      setMessages(prev => [...prev, botMessage]);
      setIsSending(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }
  };

  return (
    <section className={styles.chatContainer}>
      <header className={styles.chatHeader}>
        <h2>Welcome to Chat support</h2>
      </header>

      <MessageList 
        messages={messages} 
        currentUserId={user.id} 
        onDelete={handleDelete} 
      />

      <MessageForm 
        onSend={handleSend} 
        isSending={isSending} 
      />
    </section>
  );
};

export default Chat;
import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import styles from './Chat.module.css';

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [{
      id: "1",
      text: "Hej hur kan vi hjälpa dig idag?",
      userId: 'fake-user-123',
      user: { id: 'fake-user-123', username: 'Support Bot', avatar: 'https://i.pravatar.cc/100' },
      createdAt: new Date().toISOString()
    }];
  });

  const [isSending, setIsSending] = useState(false);

  
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const fakeUser = {
    id: 'fake-user-123',
    username: 'Support Bot',
    avatar: 'https://i.pravatar.cc/100'
  };

  const user = {
    id: 'current-user-id',
    username: 'You',
    avatar: 'https://i.pravatar.cc/100?u=current-user'
  };

  const handleSend = async (text) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      userId: user.id,
      user,
      createdAt: new Date().toISOString(),
      isOwn: true
    };

    setIsSending(true);
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const responses = [
        "Hej! hur kan jag hjälpa dig",
        "Tack för ditt meddelande!",
        "Vårt team återkommer till dig snart."
      ];
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        userId: fakeUser.id,
        user: fakeUser,
        createdAt: new Date().toISOString(),
        isOwn: false
      };
      setMessages(prev => [...prev, botMessage]);
      setIsSending(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Är du säker på att du vill ta bort meddelandet?')) {
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

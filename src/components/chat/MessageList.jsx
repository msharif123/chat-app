import React, { useRef, useEffect } from 'react';
import styles from './Chat.module.css';

const MessageList = ({ messages, currentUserId, onDelete }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  setTimeout(() => {
    const botReply = {
      id: Date.now().toString() + '-bot',
      text: `Hej! Du skrev: "${text}". Tack för ditt meddelande! 🤖`,
      userId: 'bot',
      user: { id: 'bot', username: 'Supportbot', avatar: '' },
      createdAt: new Date().toISOString(),
      isOwn: false,
    };

    setMessages(prev => [...prev, botReply]);
    scrollToBottom();
  }, 1000); // 1 sekund delay


  return (
    <ul className={styles.messagesList}>
      {messages.map(msg => {
        const isOwn = msg.userId === currentUserId;
        return (
          <li
            key={msg.id}
            className={`${styles.message} ${isOwn ? styles.messageRight : styles.messageLeft}`}
          >
            <img
              src={msg.user?.avatar || "https://i.pravatar.cc/100"}
              alt={`${msg.user?.username || 'User'}'s avatar`}
              className={styles.avatar}
            />

            {!isOwn && <span className={styles.messageSender}>{msg.user?.username || 'Support'}</span>}

            <div className={styles.messageBubble}>
              <p>{msg.text}</p>
              <div className={styles.messageMeta}>
                <time className={styles.messageTime}>
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </time>
                {isOwn && (
                  <button
                    className={styles.messageDelete}
                    onClick={() => onDelete(msg.id)}
                    aria-label="Delete message"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </li>
        );
      })}
      <div ref={messagesEndRef} />
    </ul>
  );
};

export default MessageList;
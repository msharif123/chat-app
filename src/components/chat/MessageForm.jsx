import React, { useState } from 'react';
import styles from './Chat.module.css';

const MessageForm = ({ onSend, isSending }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || isSending) return;
    onSend(trimmed);
    setMessage('');
  };

  return (
    <form className={styles.messageForm} onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={isSending}
        autoComplete="off"
        aria-label="Chat message input"
      />
      <button type="submit" disabled={!message.trim() || isSending}>
        {isSending ? 'Sending...' : 'Submit'}
      </button>
    </form>
  );
};

export default MessageForm;
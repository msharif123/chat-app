import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import styles from './Chat.module.css';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setIsAuthenticated(true);

    const fetchMessages = async () => {
      try {
        const res = await fetch("https://chatify-api.up.railway.app/messages", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setMessages(data.messages || []);
        scrollToBottom();
      } catch (err) {
        setErrorMessage(`Kunde inte hämta meddelanden. ${err.message}`);
      }
    };

    fetchMessages();
  }, [navigate]);

  const handleSend = async (text) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("Ej inloggad, kan inte skicka meddelande.");
      return;
    }

    setIsSending(true);
    setErrorMessage("");

    const tempMsg = {
      id: Date.now().toString(),
      text,
      userId: "current-user-id",
      user: { id: "current-user-id", username: "Du", avatar: "" },
      createdAt: new Date().toISOString(),
      isOwn: true,
    };

    setMessages(prev => [...prev, tempMsg]);
    scrollToBottom();

    try {
      const res = await fetch("https://chatify-api.up.railway.app/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        body: JSON.stringify({
          text,
          conversationId: null,
        }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || `HTTP ${res.status}`);
      }

      const data = await res.json();

      setMessages(prev =>
        prev.filter(m => m.id !== tempMsg.id).concat({
          ...data.latestMessage,
          isOwn: true,
        })
      );
      scrollToBottom();


      setTimeout(() => {
        const botReplies = [
          "Hej Hur kan vi hjälpa dig idag?",
          "Tack för ditt meddelande. Vi återkommer snart",
          "Hej! Supportteamet är på väg"
        ];

        const randomText = botReplies[Math.floor(Math.random() * botReplies.length)];

        const botReply = {
          id: Date.now().toString() + "-bot",
          text: randomText,
          userId: "bot",
          user: { id: "bot", username: "Supportbot", avatar: "" },
          createdAt: new Date().toISOString(),
          isOwn: false,
        };

        setMessages(prev => [...prev, botReply]);
        scrollToBottom();
      }, 1200);

    } catch (err) {
      setErrorMessage(`Kunde inte skicka meddelandet. ${err.message}`);
    } finally {
      setIsSending(false);
    }
  };

  if (isAuthenticated === null) return null;

  return (
    <section className={styles.chatContainer}>
      <header className={styles.chatHeader}>
        <h2>Chat</h2>
        {errorMessage && (
          <p style={{ color: "red", fontSize: "0.9rem" }}>{errorMessage}</p>
        )}
      </header>

      <MessageList
        messages={messages}
        currentUserId="current-user-id"
        onDelete={id =>
          window.confirm('Ta bort meddelandet?') &&
          setMessages(prev => prev.filter(m => m.id !== id))
        }
      />
      <div ref={messagesEndRef} />
      <MessageForm onSend={handleSend} isSending={isSending} />
    </section>
  );
};

export default Chat;

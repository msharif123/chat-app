import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import styles from './Chat.module.css';

const botReplies = [
  "Hur kan vi hjälpa dig idag?",
  "Tack för ditt meddelande, vi återkommer snart.",
];

const Chat = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const isFakeConversation = conversationId === "123123";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (isFakeConversation) {
      const saved = localStorage.getItem("chatMessages");

      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        const initialMessages = [
          {
            id: "10",
            text: "Hej, hur kan vi hjälpa dig idag?",
            userId: "Mohamed",
            user: {
              id: "Mohamed",
              username: "Support Bot",
              avatar: "https://i.pravatar.cc/100"
            },
            createdAt: new Date().toISOString(),
            isOwn: false
          },


        ];

        setMessages(initialMessages);
        localStorage.setItem("chatMessages", JSON.stringify(initialMessages));
      }

      setIsAuthenticated(true);
      return;
    }

    setIsAuthenticated(true);

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `https://chatify-api.up.railway.app/conversations/${conversationId}/messages`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setMessages(data.messages);
      } catch (err) {
        console.error("fetch messages error", err);
      }
    };

    fetchMessages();
  }, [conversationId, navigate, isFakeConversation]);

  const handleSend = async (text) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const newMsg = {
      id: Date.now().toString(),
      text,
      userId: 'current-user-id',
      user: { id: 'current-user-id', username: 'You', avatar: '' },
      createdAt: new Date().toISOString(),
      isOwn: true,
    };

    const updated = [...messages, newMsg];
    setMessages(updated);

    if (isFakeConversation) {
      // Spara i localStorage för fejk-konversationen
      localStorage.setItem("chatMessages", JSON.stringify(updated));

      // Simulera bot-svar efter 1 sekund
      setTimeout(() => {
        // Välj slumpmässigt svar från botReplies-arrayen
        const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];

        const botReply = {
          id: (Date.now() + 1).toString(),
          text: randomReply,
          userId: 'support-bot',
          user: {
            id: 'support-bot',
            username: 'Support Bot',
            avatar: 'https://i.pravatar.cc/100',
          },
          createdAt: new Date().toISOString(),
          isOwn: false,
        };
        const final = [...updated, botReply];
        setMessages(final);
        localStorage.setItem('chatMessages', JSON.stringify(final));
      }, 1000);
      return;
    }

    if (isAuthenticated === null) return null;

    setIsSending(true);

    try {
      const res = await fetch(
        `https://chatify-api.up.railway.app/conversations/${conversationId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const saved = await res.json();

      // Ersätt det temporära meddelandet med det sparade från servern
      setMessages((prev) =>
        prev.filter((m) => m.id !== newMsg.id).concat(saved.message)
      );
    } catch (err) {
      console.error('Send message error:', err);
    } finally {
      setIsSending(false);
    }
  };

  if (isAuthenticated === null) return null; // Vänta på autentisering

  return (
    <section className={styles.chatContainer}>
      <header className={styles.chatHeader}>
        <h2>Chat</h2>
      </header>
      <MessageList
        messages={messages}
        currentUserId="current-user-id"
        onDelete={(id) =>
          window.confirm('Ta bort meddelandet?') &&
          setMessages((prev) => prev.filter((m) => m.id !== id))
        }
      />
      <MessageForm onSend={handleSend} isSending={isSending} />
    </section>
  );
};

export default Chat;

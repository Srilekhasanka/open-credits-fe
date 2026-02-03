import React, { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { API_ENDPOINTS, HTTP_METHODS } from '../config/constants';
import authService from '../services/authService';

const zeniLogo = '/images/zeni.png';

const dummyReplies = [
  "Hi! I'm Zeni. How can I help?",
  'I can help with courses, enrollment, and account questions.',
  'Try asking: "How do I enroll?" or "What are transferable credits?"'
];

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', from: 'bot', text: "Hi, I'm Zeni. How can I help?" }
  ]);
  const [input, setInput] = useState('');
  const [replyIndex, setReplyIndex] = useState(0);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open, messages, sending]);

  const resetChat = () => {
    setMessages([{ id: 'welcome', from: 'bot', text: "Hi, I'm Zeni. How can I help?" }]);
    setInput('');
    setReplyIndex(0);
    setSending(false);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { id: `u-${Date.now()}`, from: 'user', text: trimmed };
    setInput('');
    setMessages((prev) => [...prev, userMessage]);
    setSending(true);

    try {
      const response = await fetch(API_ENDPOINTS.CHAT.SEND, {
        method: HTTP_METHODS.POST,
        headers: {
          'Content-Type': 'application/json',
          ...(authService.getAccessToken() ? { Authorization: `Bearer ${authService.getAccessToken()}` } : {})
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();
      const apiText =
        data?.payload?.reply ||
        data?.reply ||
        data?.message ||
        data?.response ||
        data?.payload?.message ||
        '';

      const botText = apiText || dummyReplies[replyIndex % dummyReplies.length];
      const botMessage = { id: `b-${Date.now() + 1}`, from: 'bot', text: botText };
      setMessages((prev) => [...prev, botMessage]);
      setReplyIndex((prev) => prev + 1);
    } catch (err) {
      const botMessage = { id: `b-${Date.now() + 1}`, from: 'bot', text: 'Sorry, I am having trouble right now.' };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot__panel" role="dialog" aria-label="Chatbot">
          <div className="chatbot__header">
            <div>
              <div className="chatbot__title">Zeni</div>
              <div className="chatbot__subtitle">Ask Zeni anything</div>
            </div>
            <button
              className="chatbot__close"
              type="button"
              aria-label="Close chat"
              onClick={() => {
                setOpen(false);
                resetChat();
              }}
            >
              x
            </button>
          </div>
          <div className="chatbot__messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot__message chatbot__message--${msg.from}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot__input">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              disabled={sending}
            />
            <button type="button" onClick={handleSend} disabled={sending} aria-label="Send message">
              {sending ? '...' : <FiArrowUpRight aria-hidden="true" />}
            </button>
          </div>
        </div>
      )}
      <button
        className="chatbot__toggle"
        type="button"
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => {
          setOpen((prev) => {
            const next = !prev;
            if (!next) {
              resetChat();
            }
            return next;
          });
        }}
      >
        {open ? 'x' : <img src={zeniLogo} alt="Zeni" className="chatbot__logo" />}
      </button>
    </div>
  );
};

export default ChatbotWidget;

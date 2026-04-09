import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm your StudyGlobe assistant. Ask me about universities, scholarships, or intake dates. 🎓",
};

const ChatBot = () => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Don't render if user isn't logged in
  if (!isAuthenticated) return null;

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat', { messages: updatedMessages });
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: res.data.reply },
      ]);
    } catch (err) {
      const status = err.response?.status;
      const errText =
        status === 429
          ? '⏳ The AI is a bit busy. Please wait a few seconds and try again.'
          : err.response?.data?.error || 'Sorry, something went wrong. Please try again.';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ ${errText}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat Window ─────────────────────────────────────────────────── */}
      {open && (
        <div
          style={{ width: 320, height: 480, bottom: 88, right: 24 }}
          className="fixed z-50 flex flex-col rounded-2xl shadow-2xl border border-gray-200 bg-white overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-2 bg-blue-700 px-4 py-3 flex-shrink-0">
            <span className="text-xl">🤖</span>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">
                StudyGlobe Assistant
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-white opacity-70 hover:opacity-100 text-xl leading-none"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <span className="text-base mr-1 self-end mb-1">🤖</span>
                )}
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm whitespace-pre-wrap'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 text-sm text-gray-800 break-words">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Thinking indicator */}
            {loading && (
              <div className="flex justify-start items-end gap-1">
                <span className="text-base">🤖</span>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                  <span className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="flex gap-2 p-2 border-t border-gray-200 bg-white flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about universities…"
              disabled={loading}
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
              aria-label="Send"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Bubble ──────────────────────────────────────────────── */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ bottom: 24, right: 24 }}
        className="fixed z-50 w-14 h-14 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? '✕' : '💬'}
      </button>
    </>
  );
};

export default ChatBot;

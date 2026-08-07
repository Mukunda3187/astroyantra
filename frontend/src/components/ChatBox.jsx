import { useState, useRef, useEffect } from 'react';

/**
 * A simple chat box. Pass an `onAsk(question, history)` function that returns
 * a Promise resolving to the answer text — this component doesn't know or care
 * whether it's talking to the chart endpoint or the compatibility endpoint.
 */
export default function ChatBox({ onAsk, suggestions = [] }) {
  const [messages, setMessages] = useState([]); // { role: 'user' | 'ai', text: string }
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  async function send(question) {
    const q = (question ?? input).trim();
    if (!q || sending) return;

    setError(null);
    setInput('');
    const history = messages.map((m) => ({ role: m.role === 'ai' ? 'astrologer' : 'user', text: m.text }));
    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setSending(true);

    try {
      const answer = await onAsk(q, history);
      setMessages((prev) => [...prev, { role: 'ai', text: answer }]);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    send();
  }

  return (
    <div className="panel reading-card chat-box">
      <h4>Ask AI About This Reading</h4>
      <p className="muted" style={{ marginBottom: '1rem' }}>
        Have a question about what you just read? Ask in plain English — for example, "What does
        my nakshatra mean for my career?"
      </p>

      {suggestions.length > 0 && messages.length === 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
              onClick={() => send(s)}
              disabled={sending}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {messages.length > 0 && (
        <div
          className="chat-messages"
          style={{
            maxHeight: '360px',
            overflowY: 'auto',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: m.role === 'user' ? 'var(--accent, #d4af37)' : 'rgba(255,255,255,0.06)',
                color: m.role === 'user' ? '#1a1a1a' : 'inherit',
                borderRadius: '12px',
                padding: '0.6rem 0.9rem',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.5,
              }}
            >
              {m.text}
            </div>
          ))}
          {sending && (
            <div style={{ alignSelf: 'flex-start', opacity: 0.7, fontStyle: 'italic' }}>
              Thinking…
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {error && <div className="error-box" style={{ marginBottom: '1rem' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          disabled={sending}
          style={{
            flex: 1,
            padding: '0.7rem 0.9rem',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.04)',
            color: 'inherit',
          }}
        />
        <button type="submit" className="btn-primary" disabled={sending || !input.trim()}>
          {sending ? 'Asking…' : 'Ask'}
        </button>
      </form>
    </div>
  );
}

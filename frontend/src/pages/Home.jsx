import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BirthPersonForm from '../components/BirthPersonForm.jsx';
import { streamChart } from '../lib/api.js';

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streamedText, setStreamedText] = useState('');
  const profileRef = useRef(null);
  const scrollRef = useRef(null);

  const canSubmit = form.name && form.day && form.month && form.year &&
    form.hour !== undefined && form.minute !== undefined &&
    form.tzOffsetHours !== undefined && form.latitude && form.longitude;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setStreamedText('');
    setLoading(true);
    profileRef.current = null;

    await streamChart(form, {
      onProfile: (profile) => {
        profileRef.current = profile;
      },
      onChunk: (deltaText) => {
        setStreamedText((prev) => prev + deltaText);
        requestAnimationFrame(() => {
          if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        });
      },
      onDone: (reading) => {
        setLoading(false);
        navigate('/chart', { state: { profile: profileRef.current, reading, readingError: null } });
      },
      onError: (message) => {
        setLoading(false);
        // The chart math already arrived via onProfile even if the AI reading failed
        if (profileRef.current) {
          navigate('/chart', { state: { profile: profileRef.current, reading: null, readingError: message } });
        } else {
          setError(message);
        }
      },
    });
  }

  return (
    <div className="page">
      <div className="container">
        <div className="hero-copy-compact">
          <div className="eyebrow">Vedic Astrology &amp; Numerology</div>
          <h1 style={{ fontSize: '2.1rem', marginTop: '0.5rem', lineHeight: 1.15 }}>
            Your birth chart, read in plain language.
          </h1>
          <p className="muted" style={{ marginTop: '0.7rem', fontFamily: 'var(--font-serif)', fontSize: '1.08rem', maxWidth: '60ch' }}>
            Enter your name, birth date, time, and place. AstroYantra calculates your Mulank, Bhagyank,
            and the sidereal position of every planet — then turns it into a reading of your
            personality, love life, career, and path to success.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="panel form-panel">
          <h3 style={{ marginBottom: '1.2rem' }}>Birth details</h3>
          <BirthPersonForm value={form} onChange={setForm} idPrefix="home" />

          {error && <div className="error-box" style={{ marginTop: '1rem' }}>{error}</div>}

          <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }} disabled={!canSubmit || loading}>
            {loading ? 'Casting your chart…' : 'Reveal my chart'}
          </button>
          <p className="muted" style={{ marginTop: '0.8rem', fontSize: '0.8rem' }}>
            For entertainment and self-reflection. Not a substitute for professional advice.
          </p>
        </form>

        {loading && (
  <div className="panel stream-panel" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
    <div className="eyebrow" style={{ marginBottom: '1rem' }}>Reading the stars…</div>
    <div className="loading-spinner" />
    <p className="muted" style={{ marginTop: '1rem' }}>
      This usually takes 15–30 seconds.
    </p>
  </div>
)}
      </div>
    </div>
  );
}

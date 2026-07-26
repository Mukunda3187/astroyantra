import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // No backend contact endpoint exists yet - this opens the user's email client
    // pre-filled with their message as a working fallback.
    const subject = encodeURIComponent(`AstroYantra contact from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:hello@astroyantra.example.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="page">
      <div className="container legal-page">
        <div className="eyebrow">Get in Touch</div>
        <h1 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Contact Us</h1>

        <div className="panel reading-card">
          <h4>Send a Message</h4>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" type="text" required value={form.name}
                onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" required value={form.email}
                onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" required rows={5} value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                style={{ width: '100%', resize: 'vertical', fontFamily: 'var(--font-body)', background: 'var(--bg-panel)', border: '1px solid var(--border)', color: 'var(--parchment)', borderRadius: '6px', padding: '0.65rem 0.8rem', fontSize: '0.95rem' }} />
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
            {sent && <p className="muted" style={{ fontSize: '0.85rem' }}>Opening your email client to send this…</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

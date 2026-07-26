import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page">
      <div className="container" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
        <div className="eyebrow">404</div>
        <h1 style={{ fontSize: '2.4rem', marginTop: '0.6rem' }}>This star hasn't been charted.</h1>
        <p className="muted" style={{ maxWidth: '46ch', margin: '1rem auto 2rem', fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>
          The page you're looking for doesn't exist, or has drifted out of orbit.
        </p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

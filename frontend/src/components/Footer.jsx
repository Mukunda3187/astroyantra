import { Link } from 'react-router-dom';

const SOCIALS = [
  { label: 'Instagram', href: null },
  { label: 'Facebook', href: null },
  { label: 'Twitter/X', href: null },
  { label: 'LinkedIn', href: null },
  { label: 'YouTube', href: null },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-mark">AstroYantra</div>
          <p className="footer-tagline">Ancient Vedic Wisdom Powered by AI</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Birth Chart</Link></li>
            <li><Link to="/compatibility">Compatibility</Link></li>
            <li><a href="#" onClick={(e) => e.preventDefault()}>Blog</a></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Follow Us</h4>
          <ul className="footer-social">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                ) : (
                  <span className="footer-social-placeholder">{s.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} AstroYantra. All Rights Reserved.</span>
          <span>Made with ❤️ using React, Node.js and Google Gemini AI.</span>
        </div>
      </div>
    </footer>
  );
}

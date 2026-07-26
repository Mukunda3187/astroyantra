export default function Disclaimer() {
  return (
    <div className="page">
      <div className="container legal-page">
        <div className="eyebrow">Important</div>
        <h1 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Disclaimer</h1>

        <div className="panel reading-card" style={{ borderColor: 'var(--vermillion)' }}>
          <h4>Entertainment &amp; Informational Purposes Only</h4>
          <p>
            AstroYantra provides AI-generated astrology and numerology insights for
            <b> informational and entertainment purposes only</b>. Readings are based on
            traditional Vedic astrological conventions interpreted by an AI model, and do not
            constitute professional advice of any kind.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Not a Substitute For</h4>
          <p>
            Content on this site should not replace advice from a qualified professional,
            including:
          </p>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.2rem', color: 'var(--parchment)' }}>
            <li>Medical advice from a licensed physician or mental health professional</li>
            <li>Financial or investment advice from a licensed advisor</li>
            <li>Legal advice from a licensed attorney</li>
            <li>Any other professional consultation relevant to your situation</li>
          </ul>
        </div>

        <div className="panel reading-card">
          <h4>Use Your Own Judgment</h4>
          <p>
            Users should make important life, health, financial, and legal decisions based on
            their own judgment and, where appropriate, in consultation with qualified
            professionals — not solely on the basis of an AstroYantra reading.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Accuracy</h4>
          <p>
            While AstroYantra's chart calculations are based on real astronomical data, different
            astrological traditions use different conventions (ayanamsa, house systems, scoring
            rules), and AI-written narration may vary in phrasing between requests. We do not
            claim definitive or universally agreed-upon accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}

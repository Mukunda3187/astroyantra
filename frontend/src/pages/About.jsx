export default function About() {
  return (
    <div className="page">
      <div className="container legal-page">
        <div className="eyebrow">About Us</div>
        <h1 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>About AstroYantra</h1>

        <div className="panel reading-card">
          <h4>What AstroYantra Is</h4>
          <p>
            AstroYantra is an AI-powered Vedic astrology and numerology platform. Instead of
            generic, one-size-fits-all horoscopes, we compute your real sidereal birth chart —
            planetary positions, houses, and nakshatras — from your exact birth date, time, and
            place, using genuine astronomical calculations. We then use AI to turn those
            computed facts into a personalized, readable narrative about your personality, love
            life, career, wealth, health, and remedies.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Our Mission</h4>
          <p>
            To make accurate, personalized Vedic astrology accessible to everyone — not just
            those who can afford a private consultation — while being transparent about how the
            reading is produced and what it can and cannot tell you.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Our Vision</h4>
          <p>
            We believe astrology works best as a tool for self-reflection, not a deterministic
            script for your life. Our vision is a platform where ancient Vedic frameworks and
            modern AI narration work together to help people think more clearly about themselves
            — their patterns, their strengths, and the questions worth asking next.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>How AI &amp; Vedic Astrology Work Together</h4>
          <p>
            AstroYantra deliberately separates two things that are usually mixed together:
            computation and narration. Every planetary position, house placement, nakshatra, and
            numerology number is computed independently using established astronomical formulas
            and traditional Vedic conventions — never invented by AI. The AI's only role is to
            explain what those already-correct facts mean, in warm, clear, everyday language.
            This keeps the astrology grounded while making the reading approachable.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Why You Can Trust Us</h4>
          <p>
            We show our work: your exact planetary placements, houses, and nakshatras are
            displayed alongside every AI-generated reading, so you can see the computed facts
            behind the narrative rather than taking it on faith. We are upfront that astrology
            has no scientific predictive validity, and we position AstroYantra as a lens for
            reflection and entertainment — not a substitute for professional medical, legal, or
            financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}

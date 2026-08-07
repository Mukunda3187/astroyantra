import { useState } from 'react';
import BirthPersonForm from '../components/BirthPersonForm.jsx';
import KundliChart from '../components/KundliChart.jsx';
import GunaMilanBreakdown from '../components/GunaMilanBreakdown.jsx';
import ReadingTabs from '../components/ReadingTabs.jsx';
import ChatBox from '../components/ChatBox.jsx';
import { getCompatibility, askCompatibilityQuestion } from '../lib/api.js';
const COMPAT_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'emotional', label: 'Emotional' },
  { key: 'communication', label: 'Communication' },
  { key: 'romance_intimacy', label: 'Romance' },
  { key: 'career_finances', label: 'Career & Money' },
  { key: 'long_term', label: 'Long Term' },
  { key: 'advice', label: 'Advice' },
];

export default function Compatibility() {
  const [personA, setPersonA] = useState({});
  const [personB, setPersonB] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function ready(p) {
    return p.name && p.day && p.month && p.year && p.hour !== undefined &&
      p.minute !== undefined && p.tzOffsetHours !== undefined && p.latitude && p.longitude;
  }
  const canSubmit = ready(personA) && ready(personB);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setResult(null);
    try {
      const data = await getCompatibility(personA, personB);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="eyebrow">Relationship Compatibility</div>
        <h1 style={{ fontSize: '2.2rem', marginTop: '0.5rem', marginBottom: '0.6rem' }}>Two charts, one story</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="two-col">
            <div className="panel form-panel">
              <h3 style={{ marginBottom: '1.2rem' }}>Person A</h3>
              <BirthPersonForm value={personA} onChange={setPersonA} idPrefix="a" />
            </div>
            <div className="panel form-panel">
              <h3 style={{ marginBottom: '1.2rem' }}>Person B</h3>
              <BirthPersonForm value={personB} onChange={setPersonB} idPrefix="b" />
            </div>
          </div>

          {error && <div className="error-box" style={{ marginTop: '1.5rem' }}>{error}</div>}

          <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem' }} disabled={!canSubmit || loading}>
            {loading ? 'Comparing charts…' : 'Check compatibility'}
          </button>
        </form>

        {result && (
          <div style={{ marginTop: '3rem' }}>
            <div className="two-col" style={{ marginBottom: '2rem' }}>
              <div className="panel reading-card">
                <KundliChart ascendantSignIndex={result.profileA.chart.ascendant.signIndex}
                  planets={result.profileA.chart.planets} centerSubtitle={result.profileA.name} />
              </div>
              <div className="panel reading-card">
                <KundliChart ascendantSignIndex={result.profileB.chart.ascendant.signIndex}
                  planets={result.profileB.chart.planets} centerSubtitle={result.profileB.name} />
              </div>
            </div>

            <div className="section-heading"><h2>Guna Milan Score</h2></div>
            <GunaMilanBreakdown guna={result.guna} />

            <div className="section-heading"><h2>Relationship Analysis</h2></div>
            {result.reading && <ReadingTabs reading={result.reading} tabs={COMPAT_TABS} />}
            {!result.reading && result.readingError && (
              <div className="error-box">
                Could not generate the AI analysis: {result.readingError}. The Guna Milan score above
                was still computed correctly.
              </div>
            )}

            {result.reading && (
              <div style={{ marginTop: '2.5rem' }}>
                <ChatBox
                  suggestions={['Are we a good match long-term?', 'What should we watch out for?', 'How can we communicate better?']}
                  onAsk={(question, history) =>
                    askCompatibilityQuestion(result.profileA, result.profileB, result.guna, result.reading, question, history).then((r) => r.answer)
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

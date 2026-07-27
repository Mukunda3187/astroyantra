import { Link } from 'react-router-dom';

const posts = [
  {
    slug: 'what-is-a-vedic-birth-chart',
    title: 'What Is a Vedic Birth Chart and How Is It Calculated?',
    excerpt:
      'A plain-language guide to what a sidereal birth chart actually is, what goes into calculating one, and why it differs from the sun-sign horoscopes you see in newspapers.',
  },
  {
    slug: 'moon-sign-vs-sun-sign',
    title: 'Moon Sign vs Sun Sign: What Is the Real Difference?',
    excerpt:
      'Most Western horoscopes are based on your sun sign alone. Vedic astrology puts far more weight on the moon sign. Here is what each one actually represents.',
  },
  {
    slug: 'numerology-basics',
    title: 'Numerology Basics: What Your Life Path Number Means',
    excerpt:
      'An introduction to how numerology numbers are derived from your name and birth date, and what the life path number is generally understood to represent.',
  },
  {
    slug: 'compatibility-matching-explained',
    title: 'How Compatibility Matching Works in Vedic Astrology',
    excerpt:
      'Ever wondered what "guna milan" or chart-matching actually checks for? A breakdown of the main factors traditionally compared between two charts.',
  },
  {
    slug: 'career-astrology-basics',
    title: 'Career Astrology: What Your Chart Says About Your Path',
    excerpt:
      'Which houses and planets are traditionally associated with career and work in Vedic astrology, and how they are typically interpreted.',
  },
  {
    slug: 'understanding-nakshatras',
    title: 'Understanding Nakshatras: The 27 Lunar Mansions',
    excerpt:
      'Nakshatras are one of the most distinctive parts of Vedic astrology. Here is what they are, why there are 27 of them, and what they add to a reading.',
  },
];

export default function BlogIndex() {
  return (
    <div className="page">
      <div className="container legal-page">
        <div className="eyebrow">Learn</div>
        <h1 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          AstroYantra Blog
        </h1>
        <p style={{ marginBottom: '2rem' }}>
          Plain-language explainers on Vedic astrology and numerology concepts referenced
          throughout your reading — no jargon, no fear-based predictions.
        </p>

        {posts.map((post) => (
          <div className="panel reading-card" key={post.slug} style={{ marginBottom: '1rem' }}>
            <h4>
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h4>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${post.slug}`}>Read more →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

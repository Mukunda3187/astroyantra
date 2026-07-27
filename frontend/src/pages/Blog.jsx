import { Link, useParams, Navigate } from 'react-router-dom';

const posts = {
  'what-is-a-vedic-birth-chart': {
    title: 'What Is a Vedic Birth Chart and How Is It Calculated?',
    excerpt:
      'A plain-language guide to what a sidereal birth chart actually is, what goes into calculating one, and why it differs from the sun-sign horoscopes you see in newspapers.',
    sections: [
      {
        heading: 'The Short Answer',
        body: `A Vedic birth chart, also called a Kundli or Janam Kundli, is a map of where the sun,
          moon, and planets were positioned in the sky at the exact moment and place you were
          born. Unlike the sun-sign horoscopes printed in newspapers, which only look at one
          data point, a full birth chart accounts for your precise birth time and location,
          which is why two people born on the same date can have noticeably different charts.`,
      },
      {
        heading: 'Sidereal vs Tropical: Why Vedic Charts Look Different',
        body: `Western astrology typically uses the tropical zodiac, which is fixed to the seasons.
          Vedic astrology uses the sidereal zodiac, which is fixed to the actual visible
          positions of the constellations. Over centuries, the difference between the two
          systems has grown to roughly 24 degrees, an offset known as the ayanamsa. This is why
          someone might be told they are one sign in a Western app and a different sign in a
          Vedic one — both can be internally correct, they are simply measuring against
          different reference points.`,
      },
      {
        heading: 'The Three Inputs a Chart Needs',
        body: `Calculating a birth chart accurately requires three pieces of information: date of
          birth, time of birth down to the minute if possible, and place of birth. The date and
          place are used to work out the exact astronomical positions of the planets that day.
          The time is used to calculate the ascendant, or rising sign — the zodiac sign that was
          on the eastern horizon at your exact moment of birth. The ascendant effectively sets
          the entire layout of the twelve houses in your chart, so even a difference of fifteen
          or twenty minutes in birth time can shift which house a planet falls into.`,
      },
      {
        heading: 'Planets, Houses, and Nakshatras',
        body: `A finished chart has three main layers. The planets (traditionally nine in Vedic
          astrology, including the lunar nodes Rahu and Ketu) represent different areas of
          life and inner drives. The twelve houses represent different domains — career,
          relationships, home, health, and so on — and which house a planet lands in shapes how
          that planet's influence is expressed. The nakshatras are a set of 27 lunar mansions
          that divide the zodiac more finely than the twelve signs, adding an extra layer of
          detail, particularly around personality and timing.`,
      },
      {
        heading: 'How AstroYantra Calculates Yours',
        body: `When you enter your birth details on AstroYantra, the platform performs the same
          underlying astronomical calculations described above to work out your actual
          planetary positions, house placements, and nakshatra — nothing here is templated or
          guessed. Once those computed facts are established, AI is used purely to translate
          them into a readable, personalized narrative about what they may mean for you.`,
      },
    ],
  },

  'moon-sign-vs-sun-sign': {
    title: 'Moon Sign vs Sun Sign: What Is the Real Difference?',
    excerpt:
      'Most Western horoscopes are based on your sun sign alone. Vedic astrology puts far more weight on the moon sign. Here is what each one actually represents.',
    sections: [
      {
        heading: 'Why This Question Comes Up So Often',
        body: `If you have ever checked your horoscope in two different apps and gotten two
          different signs, this is usually why. Mainstream Western horoscope columns are built
          almost entirely around the sun sign — the zodiac sign the sun was passing through on
          your birth date. Vedic astrology, by contrast, treats the moon sign as at least as
          important, and in many traditional practices, more important for day-to-day
          temperament and emotional patterns.`,
      },
      {
        heading: 'What the Sun Sign Represents',
        body: `The sun moves through one zodiac sign roughly every month, so your sun sign is
          determined purely by your birth date. It is generally associated with core identity,
          ego, willpower, and the broad outward personality — the traits people notice about you
          first.`,
      },
      {
        heading: 'What the Moon Sign Represents',
        body: `The moon moves much faster, changing signs roughly every two and a half days. This
          means your moon sign depends on your exact birth date and, to be precise, your birth
          time and location too. The moon sign is traditionally linked to emotional nature,
          instinctive reactions, comfort needs, and the inner self that shows up more in private
          moments than in public ones.`,
      },
      {
        heading: 'Why Vedic Astrology Leans on the Moon',
        body: `In the Vedic system, the moon sign is used as the base for a chart called the
          Chandra Kundli, and many predictive techniques, including the widely used
          Vimshottari Dasha timing system, are calculated from the moon's position rather than
          the sun's.`,
      },
      {
        heading: 'You Do Not Have to Choose One',
        body: `The two are not in competition — they describe different layers of the same person.
          A useful way to think about it: the sun sign is closer to how you present yourself and
          what you are working toward, while the moon sign is closer to how you actually feel
          and cope underneath that. A full reading, like the one AstroYantra generates from your
          complete chart, looks at both alongside your ascendant and other placements rather
          than relying on either one alone.`,
      },
    ],
  },

  'numerology-basics': {
    title: 'Numerology Basics: What Your Life Path Number Means',
    excerpt:
      'An introduction to how numerology numbers are derived from your name and birth date, and what the life path number is generally understood to represent.',
    sections: [
      {
        heading: 'What Numerology Is Trying to Do',
        body: `Numerology is a symbolic system that reduces your name and birth date down to single
          digits, then assigns traditional meanings to each digit from 1 to 9 (with 11, 22, and
          33 usually treated as special "master numbers" that are not reduced further). It is a
          separate tradition from astrology, though the two are often offered together.`,
      },
      {
        heading: 'How the Life Path Number Is Calculated',
        body: `The life path number is generally considered the most important number in a
          numerology reading. It is calculated by adding together all the digits of your full
          birth date and then reducing the result to a single digit through repeated addition.
          Different numerologists use slightly different reduction rules, particularly around
          whether to reduce the day, month, and year separately before combining them, so it is
          normal to see minor variations between calculators.`,
      },
      {
        heading: 'What Each Number Is Traditionally Said to Represent',
        body: `In broad strokes, 1 is associated with leadership and independence, 2 with
          partnership and sensitivity, 3 with creativity and expression, 4 with structure and
          reliability, 5 with change and freedom, 6 with responsibility and care for others, 7
          with introspection and analysis, 8 with ambition and material achievement, and 9 with
          idealism and completion. The master numbers 11, 22, and 33 are typically described as
          an intensified version of the 2, 4, and 6 themes.`,
      },
      {
        heading: 'Other Common Numerology Numbers',
        body: `Beyond the life path number, most numerology systems also calculate an expression
          (or destiny) number from the letters of your full birth name, and a soul urge number
          from just the vowels in your name — meant to describe natural talents and inner
          motivations respectively.`,
      },
      {
        heading: 'How to Read Numerology Sensibly',
        body: `Numerology, like astrology, has no scientific predictive validity, and is best
          treated as a reflective tool rather than a fixed script. AstroYantra calculates your
          core numbers using standard reduction methods and uses AI to explain what those
          specific numbers are traditionally associated with, so you can decide for yourself
          what resonates.`,
      },
    ],
  },

  'compatibility-matching-explained': {
    title: 'How Compatibility Matching Works in Vedic Astrology',
    excerpt:
      'Ever wondered what "guna milan" or chart-matching actually checks for? A breakdown of the main factors traditionally compared between two charts.',
    sections: [
      {
        heading: 'Where "Guna Milan" Comes From',
        body: `Chart-matching for relationships is one of the oldest applications of Vedic
          astrology, traditionally used before marriage. The most common method, called
          Ashtakoota or "guna milan," compares the moon signs and nakshatras of two people
          across eight specific categories, adding up to a maximum of 36 points.`,
      },
      {
        heading: 'The Eight Categories, Briefly',
        body: `The eight kootas assess different dimensions of compatibility: Varna (temperament
          and work ethic), Vashya (mutual influence and control), Tara (general wellbeing and
          luck), Yoni (physical and instinctive compatibility), Graha Maitri (mental and
          intellectual compatibility), Gana (behavioral disposition), Bhakoot (emotional and
          financial harmony), and Nadi (health and genetic compatibility).`,
      },
      {
        heading: 'What the Score Actually Means',
        body: `A total score is generally interpreted on a rough scale, with very low totals
          flagged as needing more careful consideration and higher totals seen as more
          favorable. Importantly, guna milan produces a structured score from specific
          astronomical placements — it does not measure how two people actually communicate,
          share values, or resolve conflict in real life.`,
      },
      {
        heading: 'Beyond the Basic Score',
        body: `More detailed compatibility readings also look at the two ascendants, the relative
          house positions of Venus and Mars (linked to romantic and physical connection), and
          any challenging planetary combinations, or doshas, present in either chart, such as
          Mangal Dosha.`,
      },
      {
        heading: 'Using Compatibility Readings Well',
        body: `AstroYantra's compatibility feature calculates the traditional koota comparisons
          between two charts and uses AI to explain, in plain language, where the natural ease
          and the potential friction points are. It is best used as one input for reflection
          alongside real conversation with your partner, not as a verdict on the relationship.`,
      },
    ],
  },

  'career-astrology-basics': {
    title: 'Career Astrology: What Your Chart Says About Your Path',
    excerpt:
      'Which houses and planets are traditionally associated with career and work in Vedic astrology, and how they are typically interpreted.',
    sections: [
      {
        heading: 'The Houses Career Astrology Centers On',
        body: `In Vedic astrology, the tenth house is the traditional house of career, public
          reputation, and life direction, while the second house relates to accumulated wealth,
          and the eleventh house to income, gains, and networks. Career readings typically start
          by examining which planets sit in or influence the tenth house, and which sign rules
          it.`,
      },
      {
        heading: 'The Tenth Lord',
        body: `Beyond the house itself, astrologers look at the "lord" of the tenth house — the
          planet that rules whichever sign sits on the tenth house cusp — and examine where that
          planet is placed elsewhere in the chart. A strong, well-placed tenth lord is generally
          read as a sign of a clearer or steadier career path.`,
      },
      {
        heading: 'What Individual Planets Are Said to Favor',
        body: `Different planets are traditionally linked to different career inclinations when
          they strongly influence career-related houses: Sun to leadership and authority roles;
          Mercury to communication and analytical work; Mars to engineering and high-energy
          fields; Jupiter to teaching and law; Venus to the arts and design; Saturn to
          long-term, structured careers; and Moon to public-facing or caregiving roles.`,
      },
      {
        heading: 'Timing: Why Dashas Matter for Career Questions',
        body: `A birth chart on its own describes tendencies, not timing. Vedic astrology uses a
          system called Vimshottari Dasha, based on the moon's nakshatra at birth, to sequence
          which planet's influence is considered dominant during different periods of life.`,
      },
      {
        heading: 'How to Use a Career Reading',
        body: `AstroYantra's career reading looks at your tenth house, its lord, and the planets
          influencing it, then uses AI to translate those placements into a plain-language
          description of the kind of work environments and roles that may suit you. Treat it as
          one perspective for reflection, not a substitute for professional guidance.`,
      },
    ],
  },

  'understanding-nakshatras': {
    title: 'Understanding Nakshatras: The 27 Lunar Mansions',
    excerpt:
      'Nakshatras are one of the most distinctive parts of Vedic astrology. Here is what they are, why there are 27 of them, and what they add to a reading.',
    sections: [
      {
        heading: 'What a Nakshatra Is',
        body: `The zodiac's 360 degrees are traditionally divided into twelve 30-degree signs, but
          Vedic astrology also divides that same circle into 27 smaller segments of roughly 13
          degrees and 20 minutes each, called nakshatras, or lunar mansions. Your "birth
          nakshatra" is whichever segment the moon occupied at your exact time of birth.`,
      },
      {
        heading: 'Why 27 Instead of 12',
        body: `The number 27 reflects the moon's sidereal orbital period — roughly the number of
          days it takes the moon to return to the same position relative to the fixed stars.
          Ancient observers tracked the moon's nightly movement through these 27 segments, which
          is why the system is sometimes called a lunar zodiac.`,
      },
      {
        heading: 'What Nakshatras Add to a Reading',
        body: `Because there are more than twice as many nakshatras as zodiac signs, they offer a
          finer level of detail than sign placement alone. Two people with the same moon sign
          can have noticeably different nakshatras, which is part of why nakshatra-level detail
          is said to capture nuances that sign-level astrology misses.`,
      },
      {
        heading: 'Nakshatras and Timing',
        body: `Beyond personality nuance, your birth nakshatra is also the starting point for the
          Vimshottari Dasha system, which sequences planetary "ruling periods" across your
          lifetime — meaning it also anchors predictive timing in a Vedic reading.`,
      },
      {
        heading: 'Where to See Yours',
        body: `When you generate a chart on AstroYantra, your birth nakshatra is calculated
          directly from your moon's exact position and shown alongside your other placements,
          with an AI-written explanation of what that specific nakshatra is traditionally
          associated with.`,
      },
    ],
  },
};

export function BlogIndex() {
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

        {Object.entries(posts).map(([slug, post]) => (
          <div className="panel reading-card" key={slug} style={{ marginBottom: '1rem' }}>
            <h4>
              <Link to={`/blog/${slug}`}>{post.title}</Link>
            </h4>
            <p>{post.excerpt}</p>
            <Link to={`/blog/${slug}`}>Read more →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const post = posts[slug];

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="page">
      <div className="container legal-page">
        <div className="eyebrow">Blog</div>
        <h1 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          {post.title}
        </h1>

        {post.sections.map((section) => (
          <div className="panel reading-card" key={section.heading}>
            <h4>{section.heading}</h4>
            <p>{section.body}</p>
          </div>
        ))}

        <p style={{ marginTop: '1.5rem' }}>
          <Link to="/blog">← Back to all articles</Link>
        </p>
      </div>
    </div>
  );
}

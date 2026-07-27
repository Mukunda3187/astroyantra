export default function WhatIsAVedicBirthChart() {
  return (
    <div className="page">
      <div className="container legal-page">
        <div className="eyebrow">Blog</div>
        <h1 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          What Is a Vedic Birth Chart and How Is It Calculated?
        </h1>

        <div className="panel reading-card">
          <h4>The Short Answer</h4>
          <p>
            A Vedic birth chart, also called a Kundli or Janam Kundli, is a map of where the sun,
            moon, and planets were positioned in the sky at the exact moment and place you were
            born. Unlike the sun-sign horoscopes printed in newspapers, which only look at one
            data point, a full birth chart accounts for your precise birth time and location,
            which is why two people born on the same date can have noticeably different charts.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Sidereal vs Tropical: Why Vedic Charts Look Different</h4>
          <p>
            Western astrology typically uses the tropical zodiac, which is fixed to the seasons.
            Vedic astrology uses the sidereal zodiac, which is fixed to the actual visible
            positions of the constellations. Over centuries, the difference between the two
            systems has grown to roughly 24 degrees, an offset known as the ayanamsa. This is why
            someone might be told they are one sign in a Western app and a different sign in a
            Vedic one — both can be internally correct, they are simply measuring against
            different reference points.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>The Three Inputs a Chart Needs</h4>
          <p>
            Calculating a birth chart accurately requires three pieces of information: date of
            birth, time of birth down to the minute if possible, and place of birth. The date and
            place are used to work out the exact astronomical positions of the planets that day.
            The time is used to calculate the ascendant, or rising sign — the zodiac sign that was
            on the eastern horizon at your exact moment of birth. The ascendant effectively sets
            the entire layout of the twelve houses in your chart, so even a difference of fifteen
            or twenty minutes in birth time can shift which house a planet falls into.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Planets, Houses, and Nakshatras</h4>
          <p>
            A finished chart has three main layers. The planets (traditionally nine in Vedic
            astrology, including the lunar nodes Rahu and Ketu) represent different areas of
            life and inner drives. The twelve houses represent different domains — career,
            relationships, home, health, and so on — and which house a planet lands in shapes how
            that planet's influence is expressed. The nakshatras are a set of 27 lunar mansions
            that divide the zodiac more finely than the twelve signs, adding an extra layer of
            detail, particularly around personality and timing.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>How AstroYantra Calculates Yours</h4>
          <p>
            When you enter your birth details on AstroYantra, the platform performs the same
            underlying astronomical calculations described above to work out your actual
            planetary positions, house placements, and nakshatra — nothing here is templated or
            guessed. Once those computed facts are established, AI is used purely to translate
            them into a readable, personalized narrative about what they may mean for you. You can
            read more about that split between computation and narration on our{' '}
            <a href="/about">About page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

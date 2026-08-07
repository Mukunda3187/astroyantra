import { Link, useParams, Navigate } from 'react-router-dom';

const posts = {
  'what-is-a-vedic-birth-chart': {
    title: 'What Is a Vedic Birth Chart and How Is It Calculated?',
    excerpt:
      'A plain-language guide to what a sidereal birth chart actually is, what goes into calculating one, and why it differs from the sun-sign horoscopes you see in newspapers.',
    sections: [
      { heading: 'The Short Answer', body: `A Vedic birth chart, also called a Kundli or Janam Kundli, is a map of where the sun, moon, and planets were positioned in the sky at the exact moment and place you were born. Unlike the sun-sign horoscopes printed in newspapers, which only look at one data point, a full birth chart accounts for your precise birth time and location, which is why two people born on the same date can have noticeably different charts.` },
      { heading: 'Sidereal vs Tropical: Why Vedic Charts Look Different', body: `Western astrology typically uses the tropical zodiac, which is fixed to the seasons. Vedic astrology uses the sidereal zodiac, which is fixed to the actual visible positions of the constellations. Over centuries, the difference between the two systems has grown to roughly 24 degrees, an offset known as the ayanamsa. This is why someone might be told they are one sign in a Western app and a different sign in a Vedic one — both can be internally correct, they are simply measuring against different reference points.` },
      { heading: 'The Three Inputs a Chart Needs', body: `Calculating a birth chart accurately requires three pieces of information: date of birth, time of birth down to the minute if possible, and place of birth. The date and place are used to work out the exact astronomical positions of the planets that day. The time is used to calculate the ascendant, or rising sign, which effectively sets the entire layout of the twelve houses in your chart, so even a difference of fifteen or twenty minutes in birth time can shift which house a planet falls into.` },
      { heading: 'Planets, Houses, and Nakshatras', body: `A finished chart has three main layers. The planets represent different areas of life and inner drives. The twelve houses represent different domains — career, relationships, home, health, and so on. The nakshatras are a set of 27 lunar mansions that divide the zodiac more finely than the twelve signs, adding an extra layer of detail, particularly around personality and timing.` },
      { heading: 'How AstroYantra Calculates Yours', body: `When you enter your birth details on AstroYantra, the platform performs the same underlying astronomical calculations described above to work out your actual planetary positions, house placements, and nakshatra. Once those computed facts are established, AI is used purely to translate them into a readable, personalized narrative about what they may mean for you.` },
    ],
  },

  'moon-sign-vs-sun-sign': {
    title: 'Moon Sign vs Sun Sign: What Is the Real Difference?',
    excerpt: 'Most Western horoscopes are based on your sun sign alone. Vedic astrology puts far more weight on the moon sign. Here is what each one actually represents.',
    sections: [
      { heading: 'Why This Question Comes Up So Often', body: `If you have ever checked your horoscope in two different apps and gotten two different signs, this is usually why. Mainstream Western horoscope columns are built almost entirely around the sun sign. Vedic astrology, by contrast, treats the moon sign as at least as important, and in many traditional practices, more important for day-to-day temperament.` },
      { heading: 'What the Sun Sign Represents', body: `The sun moves through one zodiac sign roughly every month, so your sun sign is determined purely by your birth date. It is generally associated with core identity, ego, willpower, and the broad outward personality — the traits people notice about you first.` },
      { heading: 'What the Moon Sign Represents', body: `The moon moves much faster, changing signs roughly every two and a half days. This means your moon sign depends on your exact birth date and, to be precise, your birth time and location too. The moon sign is traditionally linked to emotional nature, instinctive reactions, and comfort needs.` },
      { heading: 'Why Vedic Astrology Leans on the Moon', body: `In the Vedic system, the moon sign is used as the base for a chart called the Chandra Kundli, and many predictive techniques, including the widely used Vimshottari Dasha timing system, are calculated from the moon's position rather than the sun's.` },
      { heading: 'You Do Not Have to Choose One', body: `The two are not in competition — they describe different layers of the same person. A full reading, like the one AstroYantra generates from your complete chart, looks at both alongside your ascendant and other placements rather than relying on either one alone.` },
    ],
  },

  'numerology-basics': {
    title: 'Numerology Basics: What Your Life Path Number Means',
    excerpt: 'An introduction to how numerology numbers are derived from your name and birth date, and what the life path number is generally understood to represent.',
    sections: [
      { heading: 'What Numerology Is Trying to Do', body: `Numerology is a symbolic system that reduces your name and birth date down to single digits, then assigns traditional meanings to each digit from 1 to 9 (with 11, 22, and 33 usually treated as special "master numbers"). It is a separate tradition from astrology, though the two are often offered together.` },
      { heading: 'How the Life Path Number Is Calculated', body: `The life path number is calculated by adding together all the digits of your full birth date and then reducing the result to a single digit through repeated addition. Different numerologists use slightly different reduction rules, so it is normal to see minor variations between calculators.` },
      { heading: 'What Each Number Is Traditionally Said to Represent', body: `In broad strokes, 1 is associated with leadership, 2 with partnership, 3 with creativity, 4 with structure, 5 with change, 6 with responsibility, 7 with introspection, 8 with ambition, and 9 with idealism. The master numbers carry an intensified version of the 2, 4, and 6 themes.` },
      { heading: 'Other Common Numerology Numbers', body: `Beyond the life path number, most systems also calculate an expression number from the letters of your full birth name, and a soul urge number from just the vowels — meant to describe natural talents and inner motivations respectively.` },
      { heading: 'How to Read Numerology Sensibly', body: `Numerology, like astrology, has no scientific predictive validity, and is best treated as a reflective tool. AstroYantra calculates your core numbers using standard reduction methods and uses AI to explain what those numbers are traditionally associated with.` },
    ],
  },

  'compatibility-matching-explained': {
    title: 'How Compatibility Matching Works in Vedic Astrology',
    excerpt: 'Ever wondered what "guna milan" or chart-matching actually checks for? A breakdown of the main factors traditionally compared between two charts.',
    sections: [
      { heading: 'Where "Guna Milan" Comes From', body: `Chart-matching for relationships is one of the oldest applications of Vedic astrology. The most common method, called Ashtakoota or "guna milan," compares the moon signs and nakshatras of two people across eight categories, adding up to a maximum of 36 points.` },
      { heading: 'The Eight Categories, Briefly', body: `The eight kootas assess: Varna (temperament), Vashya (mutual influence), Tara (wellbeing), Yoni (physical compatibility), Graha Maitri (mental compatibility), Gana (behavioral disposition), Bhakoot (emotional/financial harmony), and Nadi (health/genetic compatibility).` },
      { heading: 'What the Score Actually Means', body: `A total score is generally interpreted on a rough scale, with very low totals flagged as needing more consideration. Importantly, guna milan produces a structured score from astronomical placements — it does not measure how two people actually communicate in real life.` },
      { heading: 'Beyond the Basic Score', body: `More detailed compatibility readings also look at the two ascendants, the relative house positions of Venus and Mars, and any challenging planetary combinations, or doshas, present in either chart, such as Mangal Dosha.` },
      { heading: 'Using Compatibility Readings Well', body: `AstroYantra's compatibility feature calculates the traditional koota comparisons and uses AI to explain where the natural ease and potential friction points are. It is best used as one input for reflection, not a verdict on the relationship.` },
    ],
  },

  'career-astrology-basics': {
    title: 'Career Astrology: What Your Chart Says About Your Path',
    excerpt: 'Which houses and planets are traditionally associated with career and work in Vedic astrology, and how they are typically interpreted.',
    sections: [
      { heading: 'The Houses Career Astrology Centers On', body: `The tenth house is the traditional house of career and public reputation, while the second house relates to accumulated wealth, and the eleventh house to income and gains. Career readings typically start by examining which planets sit in or influence the tenth house.` },
      { heading: 'The Tenth Lord', body: `Astrologers look at the "lord" of the tenth house — the planet that rules whichever sign sits on the tenth house cusp — and examine where that planet is placed elsewhere in the chart. A strong, well-placed tenth lord is generally read as a sign of a clearer career path.` },
      { heading: 'What Individual Planets Are Said to Favor', body: `Sun favors leadership and authority roles; Mercury favors communication and analytical work; Mars favors engineering and high-energy fields; Jupiter favors teaching and law; Venus favors the arts and design; Saturn favors long-term, structured careers; Moon favors public-facing or caregiving roles.` },
      { heading: 'Timing: Why Dashas Matter for Career Questions', body: `A birth chart on its own describes tendencies, not timing. Vedic astrology uses the Vimshottari Dasha system, based on the moon's nakshatra at birth, to sequence which planet's influence is dominant during different life periods.` },
      { heading: 'How to Use a Career Reading', body: `AstroYantra's career reading looks at your tenth house, its lord, and the planets influencing it, then uses AI to translate those placements into a plain-language description of suitable work environments. Treat it as a perspective for reflection, not a substitute for professional guidance.` },
    ],
  },

  'understanding-nakshatras': {
    title: 'Understanding Nakshatras: The 27 Lunar Mansions',
    excerpt: 'Nakshatras are one of the most distinctive parts of Vedic astrology. Here is what they are, why there are 27 of them, and what they add to a reading.',
    sections: [
      { heading: 'What a Nakshatra Is', body: `The zodiac's 360 degrees are divided into twelve 30-degree signs, but Vedic astrology also divides that same circle into 27 smaller segments of roughly 13 degrees and 20 minutes each, called nakshatras. Your "birth nakshatra" is whichever segment the moon occupied at your exact time of birth.` },
      { heading: 'Why 27 Instead of 12', body: `The number 27 reflects the moon's sidereal orbital period — roughly the number of days it takes the moon to return to the same position relative to the fixed stars.` },
      { heading: 'What Nakshatras Add to a Reading', body: `Because there are more than twice as many nakshatras as zodiac signs, they offer a finer level of detail than sign placement alone. Two people with the same moon sign can have noticeably different nakshatras.` },
      { heading: 'Nakshatras and Timing', body: `Your birth nakshatra is also the starting point for the Vimshottari Dasha system, which sequences planetary "ruling periods" across your lifetime — meaning it also anchors predictive timing in a Vedic reading.` },
      { heading: 'Where to See Yours', body: `When you generate a chart on AstroYantra, your birth nakshatra is calculated directly from your moon's exact position and shown alongside your other placements.` },
    ],
  },

  'sun-in-vedic-astrology': {
    title: 'The Sun (Surya) in Vedic Astrology',
    excerpt: 'What the Sun is traditionally believed to represent in a Vedic chart, and how its house and sign placement is typically interpreted.',
    sections: [
      { heading: 'The Sun as the Soul (Atmakaraka)', body: `In Vedic astrology, the Sun is often referred to as the "king" of the planets and is associated with the soul, willpower, self-confidence, and the father figure in one's life. A well-placed Sun is traditionally read as supporting a strong sense of identity and leadership ability.` },
      { heading: 'Sun in Different Houses', body: `The house the Sun occupies at birth shades how this solar energy expresses itself. In the first house, it is often linked to a commanding presence; in the tenth house, to career prominence and public recognition; in the seventh house, to a strong, sometimes dominant presence in partnerships.` },
      { heading: "Sun's Sign Placement", body: `The Sun is considered strongest, or "exalted," in Aries, and weakest, or "debilitated," in Libra. These are traditional strength assessments used alongside other factors — a debilitated Sun is not read as purely negative, since Vedic astrology has additional rules (like cancellation of debilitation) that can offset it.` },
      { heading: 'Common Themes Linked to the Sun', body: `Beyond career and confidence, the Sun is traditionally tied to health and vitality, government or authority connections, and one's relationship with father figures. Afflictions to the Sun are sometimes read as challenges in these specific areas rather than blanket bad luck.` },
      { heading: 'How This Shows Up in Your Reading', body: `AstroYantra factors in your Sun's house and sign placement as part of the overall personality and career analysis, translating the traditional associations above into context specific to your chart.` },
    ],
  },

  'mars-and-mangal-dosha': {
    title: 'Mars (Mangal) in Vedic Astrology and What Mangal Dosha Means',
    excerpt: 'Mars is one of the most talked-about planets in Vedic astrology, largely because of Mangal Dosha. Here is what it actually is and is not.',
    sections: [
      { heading: 'Mars as Energy and Drive', body: `Mars is traditionally associated with courage, physical energy, competitiveness, and assertiveness. A well-placed Mars is often linked to athletic ability, decisiveness, and leadership through action rather than words.` },
      { heading: 'What Mangal Dosha Actually Is', body: `Mangal Dosha, also called Kuja Dosha, refers to a specific placement pattern: Mars sitting in the 1st, 2nd, 4th, 7th, 8th, or 12th house from either the ascendant or the moon sign. It is one of the most discussed doshas because of its traditional association with marital compatibility concerns.` },
      { heading: 'Why It Gets So Much Attention', body: `Classical texts associated this placement with potential friction, delays, or conflict in marriage, which is why it is checked carefully in traditional matchmaking. However, many modern astrologers stress that the presence of Mangal Dosha alone rarely tells the whole story — its strength depends heavily on the specific sign, house, and aspects involved.` },
      { heading: 'Cancellation Factors', body: `Vedic astrology includes several traditional rules under which Mangal Dosha is considered "cancelled" or significantly weakened — for example, based on Mars's own sign placement, or if both people in a match have Mangal Dosha (sometimes read as neutralizing the concern between them).` },
      { heading: 'A Balanced Way to Read It', body: `Rather than treating Mangal Dosha as a fixed red flag, it is more accurately understood as one factor among many in a full chart and compatibility analysis. AstroYantra's compatibility tool checks for this placement and explains it as part of a broader picture, not a standalone verdict.` },
    ],
  },

  'jupiter-in-vedic-astrology': {
    title: 'Jupiter (Guru) in Vedic Astrology',
    excerpt: 'Why Jupiter is traditionally considered the most benefic planet, and what its placement is said to influence.',
    sections: [
      { heading: 'The "Great Benefic"', body: `Jupiter is traditionally regarded as the most auspicious planet in Vedic astrology, associated with wisdom, knowledge, growth, optimism, and good fortune. It is sometimes referred to as "Guru," meaning teacher, reflecting its link to higher learning and moral guidance.` },
      { heading: 'Jupiter and Expansion', body: `Wherever Jupiter sits in a chart, it is traditionally said to bring growth and opportunity to that area of life — whether that's the house of wealth, relationships, career, or education, depending on placement.` },
      { heading: "Jupiter's Sign Strength", body: `Jupiter is considered exalted in Cancer and debilitated in Capricorn. Its own signs are Sagittarius and Pisces, where it is generally read as comfortable and able to express its benefic qualities more fully.` },
      { heading: 'Guru Dasha and Life Themes', body: `A Jupiter dasha period, in the Vimshottari system, is often associated with phases of learning, spiritual growth, financial improvement, or significant life guidance — though as with all dasha periods, the specific themes depend on Jupiter's placement in the individual chart.` },
      { heading: 'How AstroYantra Reads Jupiter', body: `Your reading factors in Jupiter's house and sign placement as part of the wealth, career, and overall guidance sections, since it is traditionally one of the most influential planets for long-term fortune.` },
    ],
  },

  'saturn-in-vedic-astrology': {
    title: 'Saturn (Shani) in Vedic Astrology: Misunderstood, Not Malefic',
    excerpt: 'Saturn has a reputation for being the "hard" planet in Vedic astrology. Here is a more balanced look at what it actually represents.',
    sections: [
      { heading: 'Why Saturn Gets a Bad Reputation', body: `Saturn is traditionally classified as a malefic planet, associated with delay, discipline, hard work, and restriction. This has given it a reputation as the planet people fear most, particularly around events like "Sade Sati," a roughly seven-and-a-half-year transit period.` },
      { heading: 'The Other Side of Saturn', body: `Beyond delay and hardship, Saturn is also strongly linked to discipline, patience, structure, longevity, and eventually mastery through sustained effort. Many astrologers describe Saturn's lessons as difficult in the short term but valuable in the long run — the planet that makes you earn things properly rather than easily.` },
      { heading: 'What Sade Sati Actually Is', body: `Sade Sati refers to the period when transiting Saturn moves through the sign before, the sign of, and the sign after your natal moon sign — roughly seven and a half years total. It is traditionally associated with significant life restructuring, which can include both challenges and necessary growth, not uniformly bad luck.` },
      { heading: "Saturn's Sign Strength", body: `Saturn is exalted in Libra and debilitated in Aries. Its own signs are Capricorn and Aquarius, where its disciplined qualities are traditionally read as more constructive and less harsh.` },
      { heading: 'A More Useful Frame', body: `Rather than treating Saturn purely as something to fear, it is often more useful to read it as the part of the chart describing where you are asked to build patience and long-term structure. AstroYantra's readings aim to explain Saturn's placement in this more balanced, practical way.` },
    ],
  },

  'rahu-and-ketu-explained': {
    title: 'Rahu and Ketu: The Shadow Planets Explained',
    excerpt: 'Rahu and Ketu are not physical planets but mathematical points. Here is what they represent and why they matter in Vedic astrology.',
    sections: [
      { heading: 'What Rahu and Ketu Actually Are', body: `Unlike the other seven grahas, Rahu and Ketu are not physical bodies — they are the two points where the moon's orbit crosses the plane of the sun's apparent path, known as the lunar nodes. Rahu is the north node, Ketu is the south node, and they are always exactly opposite each other in a chart.` },
      { heading: 'Rahu: Desire and Obsession', body: `Rahu is traditionally associated with ambition, material desire, obsession, and a pull toward the unconventional or foreign. It is often described as amplifying whatever house and sign it occupies, sometimes in an ungrounded or excessive way.` },
      { heading: 'Ketu: Detachment and Past Patterns', body: `Ketu, sitting opposite Rahu, is traditionally linked to detachment, spirituality, and unfinished patterns from the past. Where Rahu pulls you toward something new, Ketu is often read as pulling you away from an area, sometimes creating a sense of disinterest or a need to let go.` },
      { heading: "Why They're Always in Opposite Houses", body: `Because Rahu and Ketu are mathematically defined as opposite points on the same orbital plane, they are always exactly 180 degrees apart — meaning if Rahu is in your 5th house, Ketu will always be in your 11th house, and so on. This built-in symmetry is unique to the nodes.` },
      { heading: 'Reading Them in Context', body: `Rahu and Ketu are generally read together, describing a single life axis of what you're pulled toward and what you're being asked to release. AstroYantra's remedies section takes their placement into account when suggesting relevant guidance.` },
    ],
  },

  'twelve-houses-explained': {
    title: 'The Twelve Houses (Bhavas) in Vedic Astrology, Explained',
    excerpt: 'Houses are one of the most important building blocks of a chart. A quick guide to what each of the twelve houses traditionally represents.',
    sections: [
      { heading: 'What a House Represents', body: `While zodiac signs describe qualities and planets describe energies, the twelve houses describe the specific areas of life those energies play out in — like the difference between an actor (planet), their character type (sign), and the stage they're performing on (house).` },
      { heading: 'Houses 1 Through 4', body: `1st house: self, physical body, and general personality. 2nd house: wealth, family, and speech. 3rd house: courage, siblings, and short journeys. 4th house: home, mother, emotional foundation, and property.` },
      { heading: 'Houses 5 Through 8', body: `5th house: creativity, children, and intelligence. 6th house: health, obstacles, and daily work. 7th house: marriage and partnerships. 8th house: transformation, longevity, and hidden matters.` },
      { heading: 'Houses 9 Through 12', body: `9th house: luck, higher learning, and father. 10th house: career and public reputation. 11th house: income, gains, and social networks. 12th house: losses, foreign connections, and spirituality.` },
      { heading: 'Why the Ascendant Matters So Much', body: `Your ascendant, or rising sign, determines which zodiac sign falls in your 1st house, which in turn sets the layout of all twelve houses for your unique chart. This is why birth time is so critical — it directly determines your house structure.` },
    ],
  },

  'vimshottari-dasha-explained': {
    title: 'Vimshottari Dasha: How Vedic Astrology Handles Timing',
    excerpt: 'A birth chart shows tendencies, not when things happen. The Vimshottari Dasha system is how Vedic astrology attempts to add timing.',
    sections: [
      { heading: 'The Problem Dashas Try to Solve', body: `A static birth chart can describe your general tendencies, but on its own it can't say when a particular period of life is likely to unfold in a certain way. The Vimshottari Dasha system was developed to address exactly this — sequencing planetary "ruling periods" across a person's life.` },
      { heading: 'How the Sequence Is Set', body: `The system uses a fixed 120-year cycle divided among the nine grahas, with each planet ruling for a set number of years (for example, Saturn rules for 19 years, Jupiter for 16). Your personal starting point in this sequence is determined by your moon's nakshatra at birth.` },
      { heading: 'Mahadasha and Antardasha', body: `The major period is called a Mahadasha (e.g., a "Saturn Mahadasha" lasting 19 years), and within it, there are sub-periods called Antardasha, ruled by each of the nine planets in turn. This creates a layered timeline — a Saturn Mahadasha with a Jupiter Antardasha blends the themes of both planets for that sub-period.` },
      { heading: 'What a Dasha Period Is Said to Indicate', body: `Broadly, the themes of a dasha period are shaped by which planet is ruling and where that planet sits in your natal chart. A Venus Mahadasha for someone with a well-placed Venus, for instance, might be read as a period favorable to relationships or creative pursuits.` },
      { heading: 'Why This Matters for Your Reading', body: `Dasha timing is a more advanced layer of analysis beyond a basic personality reading. AstroYantra calculates your current and upcoming dasha periods as part of your full chart data, giving context for which planetary themes are considered active in your life right now.` },
    ],
  },

  'remedies-in-vedic-astrology': {
    title: 'Remedies in Vedic Astrology: How They Are Traditionally Understood',
    excerpt: 'Gemstones, mantras, and charity are common suggestions in astrology readings. Here is the traditional logic behind them.',
    sections: [
      { heading: 'The Basic Idea Behind Remedies', body: `Vedic astrology traditionally treats a challenging planetary placement not as a fixed sentence, but as something that can be worked with. Remedies, or "upay," are practices believed to strengthen a beneficial planet or ease the effects of a difficult one.` },
      { heading: 'Gemstones', body: `Each planet is traditionally associated with a specific gemstone believed to channel its energy — for example, a ruby for the Sun, or a blue sapphire for Saturn. Classical texts recommend consulting a knowledgeable astrologer before wearing planetary gemstones, since an incorrectly chosen stone is traditionally believed to have no benefit or even an unwanted effect.` },
      { heading: 'Mantras', body: `Each planet also has associated mantras — repeated chants believed to invoke and harmonize that planet's energy. These are typically recommended alongside, not instead of, practical action in the area of life the planet governs.` },
      { heading: 'Charity and Service', body: `Donating items or resources traditionally linked to a specific planet (like donating black sesame seeds for Saturn) is a widely practiced remedy, rooted in the idea that generosity redirects and balances planetary energy.` },
      { heading: 'A Grounded Way to Approach Remedies', body: `Remedies are best understood as a traditional framework for reflection and intentional practice, not a guarantee of specific outcomes. AstroYantra's remedies section suggests options based on your chart's placements, offered for you to explore as you see fit.` },
    ],
  },

  'twelve-zodiac-signs-vedic-overview': {
    title: 'The Twelve Zodiac Signs in Vedic Astrology: A Quick Overview',
    excerpt: 'A short guide to the personality themes traditionally associated with each of the twelve Vedic zodiac signs.',
    sections: [
      { heading: 'Aries to Cancer', body: `Aries (Mesha): bold, initiating, competitive. Taurus (Vrishabha): steady, sensual, patient. Gemini (Mithuna): curious, communicative, adaptable. Cancer (Karka): nurturing, emotional, protective of home and family.` },
      { heading: 'Leo to Virgo', body: `Leo (Simha): confident, expressive, natural leadership. Virgo (Kanya): analytical, detail-oriented, service-minded.` },
      { heading: 'Libra to Scorpio', body: `Libra (Tula): diplomatic, relationship-focused, drawn to balance. Scorpio (Vrishchika): intense, transformative, deeply private.` },
      { heading: 'Sagittarius to Pisces', body: `Sagittarius (Dhanu): philosophical, adventurous, optimistic. Capricorn (Makara): disciplined, ambitious, patient with long-term goals. Aquarius (Kumbha): independent, idea-driven, community-oriented. Pisces (Meena): intuitive, compassionate, imaginative.` },
      { heading: 'Sign vs Moon Sign vs Ascendant', body: `Note that in Vedic astrology, "your sign" usually refers to your moon sign rather than your sun sign, and your ascendant (rising sign) shapes an entirely separate, equally important layer of your personality and life approach.` },
    ],
  },

  'panchang-basics': {
    title: 'Panchang Basics: Tithi, Nakshatra, Yoga, and Karana',
    excerpt: 'The Panchang is the traditional Vedic calendar system used to choose auspicious timing. Here are its five core elements.',
    sections: [
      { heading: 'What a Panchang Is', body: `A Panchang (meaning "five limbs") is the traditional Hindu almanac used to track auspicious and inauspicious timing for events, based on five key astronomical elements calculated for each day.` },
      { heading: 'Tithi', body: `Tithi refers to the lunar day, based on the angular distance between the sun and moon. There are 30 tithis in a lunar month, each associated with particular qualities and traditionally consulted when planning important events.` },
      { heading: 'Vaara and Nakshatra', body: `Vaara is simply the weekday, each ruled by a specific planet (for example, Sunday by the Sun, Monday by the Moon). Nakshatra, as covered in our nakshatra guide, is the lunar mansion the moon occupies that day.` },
      { heading: 'Yoga and Karana', body: `Yoga (in this context) is a calculated combination of the sun and moon's positions, said to indicate the general quality of the day. Karana is half of a tithi, adding a finer layer of timing detail.` },
      { heading: 'Why This Matters Beyond Birth Charts', body: `While your birth chart is calculated for one moment, the Panchang is calculated fresh every day, which is why it is separately used for choosing dates for weddings, housewarmings, and other significant events, distinct from natal chart analysis.` },
    ],
  },

  'gemstones-in-vedic-astrology': {
    title: 'Gemstones in Vedic Astrology: An Overview',
    excerpt: 'A guide to which gemstones are traditionally linked to which planets, and how they are typically approached.',
    sections: [
      { heading: 'The Nine Planetary Gemstones', body: `Traditional Vedic astrology associates a primary gemstone with each of the nine grahas: Ruby (Sun), Pearl (Moon), Red Coral (Mars), Emerald (Mercury), Yellow Sapphire (Jupiter), Diamond (Venus), Blue Sapphire (Saturn), Hessonite/Gomed (Rahu), and Cat's Eye (Ketu).` },
      { heading: 'Why Gemstone Choice Is Taken Seriously', body: `Because each stone is believed to amplify its associated planet's energy, choosing the wrong one for your specific chart is traditionally considered counterproductive — which is why classical texts stress that gemstone remedies should be based on individual chart analysis, not general sign-based rules alone.` },
      { heading: 'Strengthening vs Pacifying', body: `Gemstones are generally recommended in two different situations: to strengthen a planet that is favorably placed but weak in some technical sense, or — more cautiously — in relation to a planet believed to need pacifying, which is a more nuanced and debated area even among traditional astrologers.` },
      { heading: 'Practical Considerations', body: `Beyond the astrological reasoning, practical factors matter too — gemstone purity, cut, and how it's worn are all traditionally considered relevant to whether a stone is believed to be effective.` },
      { heading: 'How AstroYantra Approaches This', body: `Our remedies section suggests a gemstone associated with your chart's specific placements as one traditional option among several (alongside mantras and charity), for you to research further or discuss with a jeweler/astrologer before acting on.` },
    ],
  },

  'vedic-astrology-faq': {
    title: 'Vedic Astrology FAQ: Common Questions Answered',
    excerpt: 'Quick, plain-language answers to the questions people ask most often when they first start exploring Vedic astrology.',
    sections: [
      { heading: 'Is Vedic astrology the same as Western astrology?', body: `No. They share some historical roots but use different zodiac systems (sidereal vs tropical), different emphasis (moon sign vs sun sign), and different predictive tools (dashas vs transits as the primary timing method).` },
      { heading: 'Do I need my exact birth time?', body: `Yes, ideally to the minute. Birth time determines your ascendant, which sets your entire house structure — even a small error can shift house placements and change parts of your reading.` },
      { heading: "What if I don't know my exact birth time?", body: `You can still get a meaningful reading based on planetary signs and nakshatras, but house-based details (like career timing) will be less precise. Checking your birth certificate or hospital records is worth the effort if possible.` },
      { heading: 'Can a chart predict exact events?', body: `Traditional astrology claims to describe tendencies and periods more favorable or challenging for certain themes, not guaranteed specific events. Treat readings as a framework for reflection rather than a fixed prophecy.` },
      { heading: 'Is astrology scientifically proven?', body: `No — astrology, including the Vedic system, has no basis in modern scientific evidence and is best approached as a cultural and reflective tradition rather than a predictive science.` },
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

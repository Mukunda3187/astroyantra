const express = require('express');
const { buildProfile } = require('../astro/chartBuilder');
const { gunaMilan } = require('../astro/compatibility');
const { generateCompatibilityReading, askCompatibilityQuestion } = require('../services/geminiService');

const router = express.Router();

function toProfile(p) {
  return buildProfile({
    name: p.name,
    day: Number(p.day),
    month: Number(p.month),
    year: Number(p.year),
    hour: Number(p.hour),
    minute: Number(p.minute),
    tzOffsetHours: Number(p.tzOffsetHours),
    latitude: Number(p.latitude),
    longitude: Number(p.longitude),
    placeName: p.placeName || '',
  });
}

router.post('/', async (req, res) => {
  try {
    const { personA, personB } = req.body;
    if (!personA || !personB) {
      return res.status(400).json({ error: 'personA and personB are both required' });
    }

    const profileA = toProfile(personA);
    const profileB = toProfile(personB);

    const guna = gunaMilan(profileA.chart.planets.find((p) => p.name === 'Moon').longitude,
      profileB.chart.planets.find((p) => p.name === 'Moon').longitude);

    let reading = null;
    let readingError = null;
    try {
      reading = await generateCompatibilityReading(profileA, profileB, guna);
    } catch (e) {
      readingError = e.message;
    }

    res.json({ profileA, profileB, guna, reading, readingError });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Failed to compute compatibility' });
  }
});
router.post('/chat', async (req, res) => {
  try {
    const { profileA, profileB, guna, reading, question, history } = req.body;
    if (!profileA || !profileB || !guna || !question) {
      return res.status(400).json({ error: 'profileA, profileB, guna and question are required' });
    }
    const answer = await askCompatibilityQuestion(profileA, profileB, guna, reading, question, history);
    res.json({ answer });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Failed to answer question' });
  }
});
module.exports = router;

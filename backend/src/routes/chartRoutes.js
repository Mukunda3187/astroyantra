const express = require('express');
const { buildProfile } = require('../astro/chartBuilder');
const { generateReading, generateReadingStream } = require('../services/geminiService');

const router = express.Router();

function validateInput(body) {
  const required = ['name', 'day', 'month', 'year', 'hour', 'minute', 'tzOffsetHours', 'latitude', 'longitude'];
  for (const key of required) {
    if (body[key] === undefined || body[key] === null || body[key] === '') {
      return `Missing field: ${key}`;
    }
  }
  if (body.day < 1 || body.day > 31) return 'Invalid day';
  if (body.month < 1 || body.month > 12) return 'Invalid month';
  if (body.hour < 0 || body.hour > 23) return 'Invalid hour';
  if (body.minute < 0 || body.minute > 59) return 'Invalid minute';
  return null;
}

function parseBirthPayload(body) {
  return buildProfile({
    name: body.name,
    day: Number(body.day),
    month: Number(body.month),
    year: Number(body.year),
    hour: Number(body.hour),
    minute: Number(body.minute),
    tzOffsetHours: Number(body.tzOffsetHours),
    latitude: Number(body.latitude),
    longitude: Number(body.longitude),
    placeName: body.placeName || '',
  });
}

router.post('/', async (req, res) => {
  try {
    const err = validateInput(req.body);
    if (err) return res.status(400).json({ error: err });

    const profile = parseBirthPayload(req.body);

    let reading = null;
    let readingError = null;
    try {
      reading = await generateReading(profile);
    } catch (e) {
      readingError = e.message;
    }

    res.json({ profile, reading, readingError });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Failed to build chart' });
  }
});

// Streaming variant: Server-Sent Events. The chart math is computed instantly and sent
// first, then the Gemini reading is streamed in as text arrives so the UI can render it
// progressively instead of waiting for the whole thing.
router.post('/stream', async (req, res) => {
  const err = validateInput(req.body);
  if (err) return res.status(400).json({ error: err });

  let profile;
  try {
    profile = parseBirthPayload(req.body);
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Failed to build chart' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no', // disable proxy buffering (nginx etc.) so chunks flush immediately
  });

  const send = (event, data) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  send('profile', { profile });

  try {
    const reading = await generateReadingStream(profile, (deltaText) => {
      send('chunk', { text: deltaText });
    });
    send('done', { reading });
  } catch (e) {
    send('error', { message: e.message || 'Failed to generate reading' });
  } finally {
    res.end();
  }
});

module.exports = router;

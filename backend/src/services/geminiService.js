const axios = require('axios');

// Google AI Studio / Gemini Developer API
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}`;

function genConfig(maxOutputTokens) {
  return {
    maxOutputTokens,
    temperature: 0.9,
    responseMimeType: 'application/json',
    // Gemini 2.5 models spend part of maxOutputTokens on internal "thinking" by
    // default, which was leaving too little room for the actual JSON answer and
    // truncating it. This task doesn't need deep reasoning, so we turn it off.
    thinkingConfig: { thinkingBudget: 0 },
  };
}

function requireApiKey() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_API_KEY is not set in the backend .env file');
  }
  return apiKey;
}

// --- Non-streaming (used by the plain JSON endpoints / fallback) ---

async function callGemini(systemPrompt, userPrompt, maxOutputTokens = 3000) {
  const apiKey = requireApiKey();
  let response;
  try {
    response = await axios.post(
      `${BASE_URL}:generateContent`,
      {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: genConfig(maxOutputTokens),
      },
      {
        headers: { 'x-goog-api-key': apiKey, 'content-type': 'application/json' },
        timeout: 60000,
      }
    );
  } catch (err) {
    if (err.response) {
      const googleMessage = err.response.data?.error?.message || JSON.stringify(err.response.data);
      throw new Error(`Gemini API error (${err.response.status}): ${googleMessage}`);
    }
    throw err;
  }

  const candidate = response.data.candidates && response.data.candidates[0];
  if (!candidate) {
    throw new Error('Gemini returned no candidates: ' + JSON.stringify(response.data).slice(0, 300));
  }
  if (candidate.finishReason === 'MAX_TOKENS') {
    throw new Error('Gemini response was cut off (MAX_TOKENS) — try raising maxOutputTokens');
  }

  const parts = (candidate.content && candidate.content.parts) || [];
  const text = parts.map((p) => p.text || '').join('\n').trim();
  if (!text) {
    throw new Error('Gemini returned an empty response: ' + JSON.stringify(response.data).slice(0, 300));
  }
  return text;
}

// --- Streaming (SSE) - used so the UI can render text progressively ---

async function callGeminiStream(systemPrompt, userPrompt, maxOutputTokens, onChunk) {
  const apiKey = requireApiKey();
  let response;
  try {
    response = await axios.post(
      `${BASE_URL}:streamGenerateContent?alt=sse`,
      {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: genConfig(maxOutputTokens),
      },
      {
        headers: { 'x-goog-api-key': apiKey, 'content-type': 'application/json' },
        responseType: 'stream',
        timeout: 90000,
      }
    );
  } catch (err) {
    if (err.response && err.response.data) {
      let body = '';
      try {
        await new Promise((resolve) => {
          err.response.data.on('data', (c) => (body += c.toString()));
          err.response.data.on('end', resolve);
          err.response.data.on('error', resolve);
        });
      } catch (_) { /* best effort */ }
      let message = body || err.message;
      try { message = JSON.parse(body)?.error?.message || message; } catch (_) { /* not JSON */ }
      throw new Error(`Gemini API error (${err.response.status}): ${message}`);
    }
    throw err;
  }

  return new Promise((resolve, reject) => {
    let buffer = '';
    let fullText = '';
    let finishReason = null;
    let settled = false;

    response.data.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep any incomplete trailing line for the next round

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const jsonStr = trimmed.slice(5).trim();
        if (!jsonStr) continue;
        try {
          const obj = JSON.parse(jsonStr);
          const candidate = obj.candidates && obj.candidates[0];
          if (!candidate) continue;
          if (candidate.finishReason) finishReason = candidate.finishReason;
          const parts = (candidate.content && candidate.content.parts) || [];
          const deltaText = parts.map((p) => p.text || '').join('');
          if (deltaText) {
            fullText += deltaText;
            onChunk(deltaText);
          }
        } catch (_) {
          // partial/malformed line - ignore, next chunk will complete it
        }
      }
    });

    response.data.on('end', () => {
      if (settled) return;
      settled = true;
      if (finishReason === 'MAX_TOKENS') {
        reject(new Error('Gemini response was cut off (MAX_TOKENS) — try raising maxOutputTokens'));
        return;
      }
      if (!fullText.trim()) {
        reject(new Error('Gemini returned an empty streamed response'));
        return;
      }
      resolve(fullText);
    });

    response.data.on('error', (err) => {
      if (settled) return;
      settled = true;
      reject(err);
    });
  });
}

// --- Prompts (shared between streaming and non-streaming paths) ---

const READING_SYSTEM_PROMPT = `You are Pundalik, a warm and insightful Vedic astrologer and numerologist.
You are given precomputed, accurate chart facts (numerology numbers, ascendant, planetary
sign/house/nakshatra placements, ruling planet, guna). Do NOT invent or contradict these facts —
only interpret them. Write in clear, engaging, encouraging language for a general audience. Avoid
superstition-mongering, avoid absolute predictions about death/disease/misfortune, and note that
astrology is a lens for reflection, not a deterministic guarantee. Each "content" field should be
2-4 sentences. Respond ONLY with a JSON object (no markdown fences, no preamble) matching this
exact shape:
{
  "personality": "2-3 sentence overview of core personality, blending numerology + ascendant/moon sign",
  "mulankInsight": "2-3 sentences interpreting the Mulank number specifically for this person",
  "bhagyankInsight": "2-3 sentences interpreting the Bhagyank number specifically for this person",
  "love": [
    { "title": "Love & Relationships", "content": "..." },
    { "title": "Your Strengths in Love", "content": "..." },
    { "title": "Challenges to Navigate", "content": "..." },
    { "title": "Marriage Timing", "content": "..." },
    { "title": "Guidance", "content": "..." }
  ],
  "career": {
    "overview": "2-3 sentences on career & profession themes",
    "bestFields": ["Field 1", "Field 2", "Field 3", "Field 4"],
    "cards": [
      { "title": "Professional Strengths", "content": "..." },
      { "title": "Career Challenges", "content": "..." },
      { "title": "Peak Periods", "content": "..." },
      { "title": "Guidance", "content": "..." }
    ]
  },
  "wealth": [
    { "title": "Wealth & Finance", "content": "..." },
    { "title": "Earning Style", "content": "..." },
    { "title": "Best Investments", "content": "..." },
    { "title": "Financial Risks", "content": "..." }
  ],
  "health": [
    { "title": "Health & Vitality", "content": "..." },
    { "title": "Areas of Strength", "content": "..." },
    { "title": "Areas to Watch", "content": "..." },
    { "title": "Guidance", "content": "..." }
  ],
  "remedies": [
    { "title": "Gemstone", "content": "..." },
    { "title": "Mantra", "content": "..." },
    { "title": "Charity & Service", "content": "..." },
    { "title": "Lifestyle Practice", "content": "..." }
  ]
}`;
// --- Chat (follow-up questions about an already-generated chart/reading) ---
// This uses plain text output (not JSON) since answers are conversational.

function genConfigText(maxOutputTokens) {
  return {
    maxOutputTokens,
    temperature: 0.7,
    thinkingConfig: { thinkingBudget: 0 },
  };
}

async function callGeminiText(systemPrompt, userPrompt, maxOutputTokens = 700) {
  const apiKey = requireApiKey();
  let response;
  try {
    response = await axios.post(
      `${BASE_URL}:generateContent`,
      {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
        generationConfig: genConfigText(maxOutputTokens),
      },
      {
        headers: { 'x-goog-api-key': apiKey, 'content-type': 'application/json' },
        timeout: 60000,
      }
    );
  } catch (err) {
    if (err.response) {
      const googleMessage = err.response.data?.error?.message || JSON.stringify(err.response.data);
      throw new Error(`Gemini API error (${err.response.status}): ${googleMessage}`);
    }
    throw err;
  }

  const candidate = response.data.candidates && response.data.candidates[0];
  if (!candidate) throw new Error('Gemini returned no candidates');

  const parts = (candidate.content && candidate.content.parts) || [];
  const text = parts.map((p) => p.text || '').join('\n').trim();
  if (!text) throw new Error('Gemini returned an empty response');
  return text;
}

const CHAT_SYSTEM_PROMPT = `You are a friendly Vedic astrology assistant answering a user's
follow-up questions about their own birth chart or compatibility reading. Always answer in
simple, everyday English — no jargon dumps, no JSON. Be warm, clear, and concise (usually
3-6 sentences, longer only if the question truly needs it). Base your answer on the chart data
and reading provided as context. Do not give medical, legal, or financial advice — gently
suggest a qualified professional for those. This is for entertainment and self-reflection.`;

function formatHistory(history) {
  return (history || [])
    .slice(-6)
    .map((h) => `${h.role === 'user' ? 'User' : 'Astrologer'}: ${h.text}`)
    .join('\n');
}

async function askChartQuestion(profile, reading, question, history) {
  const { name, chart, numerology } = profile;
  const prompt = `Chart context for ${name}:
Moon Sign: ${chart.moonSign} | Ascendant: ${chart.ascendant.sign} | Nakshatra: ${chart.moonNakshatra.name}
Mulank: ${numerology.mulank} | Bhagyank: ${numerology.bhagyank}
Reading (for reference): ${JSON.stringify(reading || {}).slice(0, 4000)}

${formatHistory(history) ? `Conversation so far:\n${formatHistory(history)}\n` : ''}
User's new question: ${question}

Answer in simple, plain English using the context above.`;
  return callGeminiText(CHAT_SYSTEM_PROMPT, prompt, 600);
}
function buildReadingPrompt(profile) {
  const { name, numerology, chart } = profile;
  const planetLines = chart.planets
    .map((p) => `${p.name}: ${p.sign} (house ${p.house}), nakshatra ${p.nakshatra.name}${p.retrograde ? ', retrograde' : ''}`)
    .join('\n');

  return `Person: ${name}
Mulank (root number): ${numerology.mulank} — ruler ${numerology.mulankInfo.ruler}
Bhagyank (destiny number): ${numerology.bhagyank} — ruler ${numerology.bhagyankInfo.ruler}
Ascendant (Lagna): ${chart.ascendant.sign} (${chart.ascendant.signSanskrit}), nakshatra ${chart.ascendant.nakshatra.name}
Moon sign (Rashi): ${chart.moonSign} (${chart.moonSignSanskrit}), nakshatra ${chart.moonNakshatra.name}
Ruling planet (nakshatra lord): ${chart.rulingPlanet}
Guna: ${chart.guna}
Western tropical sun sign: ${chart.westernZodiac}

Planetary placements (whole-sign houses):
${planetLines}

Write the JSON reading now.`;
}

const COMPAT_SYSTEM_PROMPT = `You are Pundalik, a warm and insightful Vedic astrologer.
You are given two people's precomputed chart facts and an accurate Ashtakoot Guna Milan score
(out of 36) with its breakdown. Do NOT invent or contradict these facts. Write a balanced,
constructive compatibility analysis — mention real strengths and real friction points, and avoid
fatalistic language. Respond ONLY with a JSON object (no markdown fences, no preamble):
{
  "overview": "2 paragraphs summarizing the match",
  "emotional": "1-2 paragraphs on emotional/moon-sign compatibility",
  "communication": "1-2 paragraphs on communication & mental compatibility",
  "romance_intimacy": "1-2 paragraphs on romantic/physical chemistry",
  "career_finances": "1-2 paragraphs on shared ambitions, money compatibility",
  "long_term": "1-2 paragraphs on long-term prospects, family life, what to work on",
  "advice": "1 short paragraph of practical, constructive advice for the couple"
}`;


async function askCompatibilityQuestion(profileA, profileB, guna, reading, question, history) {
  const prompt = `Compatibility context:
${profileA.name} — Moon Sign: ${profileA.chart.moonSign}, Ascendant: ${profileA.chart.ascendant.sign}
${profileB.name} — Moon Sign: ${profileB.chart.moonSign}, Ascendant: ${profileB.chart.ascendant.sign}
Guna Milan Score: ${guna.total} / ${guna.maxTotal}
Reading (for reference): ${JSON.stringify(reading || {}).slice(0, 4000)}

${formatHistory(history) ? `Conversation so far:\n${formatHistory(history)}\n` : ''}
User's new question: ${question}

Answer in simple, plain English using the context above.`;
  return callGeminiText(CHAT_SYSTEM_PROMPT, prompt, 600);
}
function buildCompatPrompt(personA, personB, gunaResult) {
  const factorLines = gunaResult.factors.map((f) => `${f.label}: ${f.score}/${f.max}`).join('\n');
  return `Person A: ${personA.name}
Moon sign: ${personA.chart.moonSign}, nakshatra ${personA.chart.moonNakshatra.name}
Ascendant: ${personA.chart.ascendant.sign}
Mulank/Bhagyank: ${personA.numerology.mulank}/${personA.numerology.bhagyank}

Person B: ${personB.name}
Moon sign: ${personB.chart.moonSign}, nakshatra ${personB.chart.moonNakshatra.name}
Ascendant: ${personB.chart.ascendant.sign}
Mulank/Bhagyank: ${personB.numerology.mulank}/${personB.numerology.bhagyank}

Guna Milan score: ${gunaResult.total}/${gunaResult.maxTotal} — ${gunaResult.verdict}
Breakdown:
${factorLines}
Nadi Dosha present: ${gunaResult.doshas.nadiDosha}
Bhakoot Dosha present: ${gunaResult.doshas.bhakootDosha}

Write the JSON compatibility analysis now.`;
}

function safeParseJson(raw) {
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    throw new Error('Gemini did not return valid JSON: ' + cleaned.slice(0, 200));
  }
}

// --- Public API ---

async function generateReading(profile) {
  const raw = await callGemini(READING_SYSTEM_PROMPT, buildReadingPrompt(profile), 6000);
  return safeParseJson(raw);
}

async function generateReadingStream(profile, onChunk) {
  try {
    const raw = await callGeminiStream(READING_SYSTEM_PROMPT, buildReadingPrompt(profile), 6000, onChunk);
    return safeParseJson(raw);
  } catch (e) {
    // Streaming got cut off (network hiccup) — silently retry once via the
    // more reliable non-streaming call before giving up.
    console.warn('Streamed reading failed, retrying non-streamed:', e.message);
    const raw = await callGemini(READING_SYSTEM_PROMPT, buildReadingPrompt(profile), 6000);
    return safeParseJson(raw);
  }
}

async function generateCompatibilityReading(personA, personB, gunaResult) {
  const raw = await callGemini(COMPAT_SYSTEM_PROMPT, buildCompatPrompt(personA, personB, gunaResult), 4000);
  return safeParseJson(raw);
}

async function generateCompatibilityReadingStream(personA, personB, gunaResult, onChunk) {
  const raw = await callGeminiStream(COMPAT_SYSTEM_PROMPT, buildCompatPrompt(personA, personB, gunaResult), 4000, onChunk);
  return safeParseJson(raw);
}
async function generateCompatibilityReadingStream(personA, personB, gunaResult, onChunk) {
  try {
    const raw = await callGeminiStream(COMPAT_SYSTEM_PROMPT, buildCompatPrompt(personA, personB, gunaResult), 4000, onChunk);
    return safeParseJson(raw);
  } catch (e) {
    console.warn('Streamed compatibility reading failed, retrying non-streamed:', e.message);
    const raw = await callGemini(COMPAT_SYSTEM_PROMPT, buildCompatPrompt(personA, personB, gunaResult), 4000);
    return safeParseJson(raw);
  }
}
module.exports = {
  generateReading,
  generateReadingStream,
  generateCompatibilityReading,
  generateCompatibilityReadingStream,
  askChartQuestion,
  askCompatibilityQuestion,
};

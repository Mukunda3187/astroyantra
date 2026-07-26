# Pundalik — Vedic Astrology & Numerology

Full-stack app: give a name, birth date, time, and place → get Mulank/Bhagyank numerology,
a sidereal (Lahiri) Vedic birth chart with every planet's sign/house/nakshatra, and Gemini-written
readings for personality, love, career, and success. A second page runs Ashtakoot Guna Milan
compatibility matching between two people, plus a Gemini-written relationship analysis.

```
pundalik/
├── backend/    Node + Express API — chart math + Gemini calls
└── frontend/   React (Vite) UI
```

## How the astrology is computed (read this first)

- **Numerology** — Mulank (digit-sum of birth day) and Bhagyank (digit-sum of full DOB), reduced to 1–9.
- **Planet positions** — computed with the `astronomy-engine` library (real astronomical ephemeris,
  no external API), converted from tropical to **sidereal** using a Lahiri ayanamsa approximation
  (accurate to a fraction of a degree — fine for sign/house/nakshatra level astrology).
- **Rahu/Ketu** — mean lunar node formula (the standard used by most Vedic software).
- **Houses** — whole-sign system (each house = one full zodiac sign), the most common approach in
  Jyotish, computed from a manually-derived Ascendant (needs birth time + place — this is why the
  form asks for both).
- **Guna Milan** — all 8 traditional kootas (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana,
  Bhakoot, Nadi) computed from the two Moon positions, standard published tables.
- **The actual "readings"** (personality/love/career/success/compatibility text) are written by
  Gemini, given the *precomputed* facts above as input — Gemini interprets, it doesn't invent the
  chart itself.

This is a solid, defensible implementation of mainstream Jyotish conventions — but different
schools of astrology use different ayanamsas, house systems, and koota rules, and this is not a
professional astrologer. Treat it as entertainment / a reflection tool, which is also what the
app tells users.

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your Gemini API key (get one free at https://aistudio.google.com/apikey):

```
GOOGLE_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.5-flash
PORT=4000
```

Run it:

```bash
npm start
# → Pundalik backend running on http://localhost:4000
```

Without a valid key, chart math still works and is returned — only the AI-written reading will
show a clear error message in the UI instead of crashing.

**If you get a 401 error**, it's almost always the key: make sure it's a *Gemini Developer API*
key from https://aistudio.google.com/apikey (starts with `AIza`), not an OAuth token, service
account key, or a key from a different Google product — those look different and won't work here.
Also confirm the key hasn't hit its free-tier quota in Google AI Studio.

## 2. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env    # VITE_API_BASE=http://localhost:4000 by default
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Birth-place search uses OpenStreetMap's free Nominatim geocoding API directly from the browser —
no key needed, but keep an eye on their usage policy if you get real traffic:
https://operations.osmfoundation.org/policies/nominatim/

## 3. Docker (single container, needed for AWS)

`Dockerfile` at the project root builds the frontend and serves it from the same Express
process as the API, on one port — this is what makes a single-container AWS deployment
(App Runner, Elastic Beanstalk, ECS) possible.

Build and run it locally to confirm before deploying:

```bash
docker build -t pundalik .
docker run -p 4000:4000 \
  -e GOOGLE_API_KEY=your_real_key \
  -e GEMINI_MODEL=gemini-2.5-flash \
  pundalik
```

Open http://localhost:4000 — the full app (frontend + API) is served from that single port.

## 4. Deploying to AWS (App Runner)

I can't provision this live myself — no AWS account access from where I run. Steps below get
you a public HTTPS URL in about 10-15 minutes. You'll need the AWS CLI installed and
`aws configure` run once with your credentials.

```bash
# 1. Create an ECR repository to hold the image
aws ecr create-repository --repository-name pundalik --region us-east-1

# 2. Authenticate Docker to ECR (replace ACCOUNT_ID with your AWS account id)
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# 3. Build for the linux/amd64 platform App Runner runs on, tag, and push
docker build --platform linux/amd64 -t pundalik .
docker tag pundalik:latest ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/pundalik:latest
docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/pundalik:latest
```

Then in the **AWS Console**:
1. Go to **App Runner → Create service**.
2. Source: **Container registry** → **Amazon ECR** → select the `pundalik` image you just pushed.
3. Deployment settings: manual (or automatic if you want new pushes to redeploy automatically).
4. Port: `4000`.
5. Environment variables: add `GOOGLE_API_KEY` (your real key) and `GEMINI_MODEL` = `gemini-2.5-flash`.
6. Health check path: `/api/health`.
7. Create & deploy. App Runner gives you a public URL like:
   ```
   https://xxxxxxxxxx.us-east-1.awsapprunner.com
   ```
   That's your live AWS URL for the assignment submission.

**Cost note:** App Runner's smallest instance size is not part of the AWS free tier long-term,
but is inexpensive (well under $10/month) if you stop/delete the service after grading. Set a
budget alert in AWS Billing before deploying, as the course guidelines recommend.

### Alternative: Render / Netlify (not AWS, but fine for personal use)
`backend/render.yaml`, `backend/Procfile`, and `frontend/netlify.toml` are still included if you
want a quick non-AWS deployment for your own use outside the assignment. In that setup the
frontend and backend deploy as two separate services (Render for the API, Netlify for the static
site) rather than the single Docker container above — see git history / ask if you need those
steps again.

### CORS
The backend currently allows all origins (`cors()` with no options) for easy local dev. Before
finalizing, lock `app.use(cors())` down to your actual deployed domain in `backend/src/server.js`
(less critical for the single-container AWS setup, since frontend and API share an origin there).

## 5. What's on each page

- **Home** — birth details form, front and center, no scrolling required. On submit, the reading
  streams in live (Server-Sent Events) into a typewriter-style panel as Gemini generates it,
  rather than waiting silently for the whole response.
- **Your Chart result** — a stats strip (Mulank, Bhagyank, Rashi, Lagna, Nakshatra) under the
  name, then 7 tabs: **Overview** (cosmic profile table + personality), **Kundli** (square
  North-Indian-style grid chart + full planet table), **Love**, **Career** (includes a
  "Best Fields" tag list), **Wealth**, **Health**, **Remedies** — each a stack of titled cards
  written by Gemini from the computed chart facts.
- **Compatibility** — two birth-detail forms, Guna Milan score breakdown, both Kundli charts
  side by side, and a tabbed relationship analysis (non-streaming - full response returned at once).

## 6. Project structure

```
Dockerfile               single-container build: frontend static build + backend API on one port
.dockerignore

backend/src/
  astro/
    numerology.js       Mulank / Bhagyank
    ephemeris.js         planet positions, ascendant, houses, nakshatras (astronomy-engine)
    vedicData.js          static reference tables (signs, nakshatras, friendships, guna milan data)
    chartBuilder.js       combines numerology + ephemeris into one profile
    compatibility.js      Ashtakoot Guna Milan scoring
  services/
    geminiService.js      calls the Gemini API - both plain JSON and streaming (SSE) variants
  routes/
    chartRoutes.js         POST /api/chart (blocking) and POST /api/chart/stream (SSE)
    compatibilityRoutes.js POST /api/compatibility
  server.js               also serves backend/public (the built frontend) when present

frontend/src/
  pages/         Home.jsx, ChartResult.jsx, Compatibility.jsx
  components/    KundliChart.jsx (grid-style birth chart), BirthPersonForm.jsx,
                 CosmicProfileTable.jsx, CardSection.jsx, TagList.jsx, PlanetTable.jsx,
                 ReadingTabs.jsx, GunaMilanBreakdown.jsx
  lib/api.js     fetch helpers, SSE stream parser, Nominatim geocoding
```

## 7. Extending it

- Swap the Lahiri ayanamsa formula for a table-based one (e.g. Swiss Ephemeris data) if you need
  arc-second precision.
- Add a proper timezone lookup (e.g. Google Time Zone API) instead of the manual offset field.
- Add auth + a database to save charts instead of passing them through router state.
- Add divisional charts (D9/Navamsa etc.) — `ephemeris.js` already gives raw sidereal longitudes,
  so this is mostly new math in that file plus another `KundliChart` instance in the UI.

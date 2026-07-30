export default function PrivacyPolicy() {
  return (
    <div className="page">
      <div className="container legal-page">
        <div className="eyebrow">Legal</div>
        <h1 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Privacy Policy</h1>

        <div className="panel reading-card">
          <h4>Information We Collect</h4>
          <p>
            When you request a reading, we collect the name and birth details (date, time, and
            place) you provide, solely to compute your chart and generate your reading. We do
            not require account creation, and we do not collect payment information anywhere on
            this site.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Cookies &amp; Analytics</h4>
          <p>
            AstroYantra may use cookies and standard web analytics tools to understand aggregate
            usage patterns (e.g. which pages are visited, general traffic volume) and to support
            advertising features once enabled. Analytics data is used in aggregate and is not
            used to identify you personally.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>How We Process Your Input</h4>
          <p>
            Your birth details are sent to our backend server to compute your chart, and the
            computed chart facts (not your raw personal details) are sent to API models
            to generate the written reading. Your birth-details form data is not permanently
            stored on our servers; results are held only in your browser session unless you
            choose to save or share them yourself.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Data Security</h4>
          <p>
            All API keys and credentials used to connect to third-party AI services are stored
            server-side only and are never exposed in the browser or in our source code. Traffic
            to and from AstroYantra is served over HTTPS.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>No Selling of Personal Data</h4>
          <p>
            We do not sell, rent, or trade your personal information to third parties for
            marketing purposes.
          </p>
        </div>

        <div className="panel reading-card">
          <h4>Contact</h4>
          <p>
            Questions about this policy can be comment in my youtube channel i will reply that
            {' '}<a href="https://www.youtube.com/channel/UCHI8_cRMDp4LJJaYkXz5Fbw">YOUTUBE</a>.
          </p>
        </div>

        <p className="muted" style={{ fontSize: '0.82rem', marginTop: '1rem' }}>
          Last updated: 2026. This policy may be updated periodically; continued use of the site
          constitutes acceptance of the current version.
        </p>
      </div>
    </div>
  );
}

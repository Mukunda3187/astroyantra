import React from "react";

export default function Contact() {
  return (
    <div className="page">
      <div className="container legal-page">
        <div className="panel reading-card" style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Subscribe & Watch
          </h1>

          <p style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            Subscribe and watch the videos on our YouTube channel.
            <br />
            Share the videos with your friends.
            <br />
            If you want to contact me, comment on any of my videos.
          </p>

          <a
            href="https://www.youtube.com/channel/UCHI8_cRMDp4LJJaYkXz5Fbw"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              textDecoration: "none",
              padding: "12px 28px",
              fontSize: "1rem",
              borderRadius: "8px",
            }}
          >
            ▶ YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

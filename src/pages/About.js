// src/pages/About.js
import React from "react";
import "./About.css";

export default function About() {
  return (
    <main className="about-page">
      {/* Ambient glow blobs */}
      <div className="about-glow glow-a" />
      <div className="about-glow glow-b" />
      <div className="about-glow glow-c" />

      <section className="about-hero">
 <p className="about-kicker">Our Story</p>

        <h1 className="about-title">
          <span className="brand-name brand-highlight">LuminoLearn</span>
          <span className="about-title-rest"> is a learning studio for modern families.</span>
        </h1>

        <p className="about-lead">
          We focus on <strong>strong skills</strong>, <strong>clear progress</strong>, and{" "}
          <strong>tech-safe learning</strong> so kids grow with confidence and parents always know
          what’s next.
        </p>

        <div className="about-badges">
          <span className="badge-pill">Structured</span>
          <span className="badge-pill">Measurable</span>
          <span className="badge-pill">Parent-Friendly</span>
          <span className="badge-pill">Tech-Safe</span>
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-h2">
          What makes <span className="brand-highlight-inline">LuminoLearn</span> different
        </h2>

        <div className="about-grid">
          <article className="about-card">
            <div className="card-top">
              <span className="card-icon">🧭</span>
              <h3>Clear structure</h3>
            </div>
            <p>
              A simple roadmap that keeps learning calm and consistent:
              <span className="pathline">
                <strong> LuminoStart™</strong> (4 weeks) - <strong>LuminoCore™</strong> (12 weeks)
              </span>
            </p>
            <p className="card-mini">No guesswork, just a path that makes sense from day one.</p>
          </article>

          <article className="about-card">
            <div className="card-top">
              <span className="card-icon">🏁</span>
              <h3>Real outcomes</h3>
            </div>
            <p>
              Students don’t just “finish lessons.” They produce visible work projects, feedback,
              and progress you can measure.
            </p>
            <p className="card-mini">Learning becomes visible, not vague.</p>
          </article>

          <article className="about-card">
            <div className="card-top">
              <span className="card-icon">🤍</span>
              <h3>Parent-friendly</h3>
            </div>
            <p>
              Clear summaries, quick updates, and next-step guidance you can actually use without
              overwhelming dashboards.
            </p>
            <p className="card-mini">You’ll always know where your child is and what comes next.</p>
          </article>

          <article className="about-card">
            <div className="card-top">
              <span className="card-icon">🛡️</span>
              <h3>Tech-safe learning</h3>
            </div>
            <p>
              Child-friendly tools, privacy-aware workflows, and intentional screen use designed
              for focus, not noise.
            </p>
            <p className="card-mini">Modern learning, responsibly built.</p>
          </article>
        </div>
      </section>

      <section className="about-promise">
        <div className="promise-card">
          <p className="promise-kicker">Our promise</p>
          <h2 className="promise-title">Confidence first. Progress always.</h2>
          <p className="promise-text">
            We don’t overload kids. We build confidence step by step through consistent routines,
            caring instruction, and a learning path that makes growth visible.
          </p>

          <div className="promise-footer">
            <span className="promise-chip">Calm structure</span>
            <span className="promise-chip">Caring instruction</span>
            <span className="promise-chip">Visible growth</span>
          </div>
        </div>
      </section>
    </main>
  );
}

// src/pages/About.js
// Our Story — Aligned with LuminoPro: main-hero, main-value-section, main-value-card
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import "../pages/Main.css";
import AboutImage from "../assets/About.svg";

const differentiatorCards = [
  {
    icon: "🧭",
    title: "Clear structure",
    desc: "A simple roadmap that keeps learning calm and consistent:",
    pathline: "LuminoStart™ (4 weeks) • LuminoCore™ (12 weeks)",
    mini: "No guesswork, just a path that makes sense from day one.",
    tip: "Every family knows exactly where they are and what comes next.",
  },
  {
    icon: "🏁",
    title: "Real outcomes",
    desc: "Students don't just \"finish lessons.\" They produce visible work projects, feedback, and progress you can measure.",
    mini: "Learning becomes visible, not vague.",
    tip: "Projects and certificates you can see and celebrate.",
  },
  {
    icon: "🤍",
    title: "Parent-friendly",
    desc: "Clear summaries, quick updates, and next-step guidance you can actually use without overwhelming dashboards.",
    mini: "You'll always know where your child is and what comes next.",
    tip: "Designed for busy parents who want clarity, not clutter.",
  },
  {
    icon: "🛡️",
    title: "Tech-safe learning",
    desc: "Child-friendly tools, privacy-aware workflows, and intentional screen use designed for focus, not noise.",
    mini: "Modern learning, responsibly built.",
    tip: "Screen time that builds skills, not distraction.",
  },
];

export default function About() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedChip, setExpandedChip] = useState(null);

  const promiseChips = [
    { id: "calm", label: "Calm structure", desc: "No overwhelm. A clear path that builds step by step." },
    { id: "caring", label: "Caring instruction", desc: "Teachers who meet kids where they are and build confidence." },
    { id: "visible", label: "Visible growth", desc: "Progress you can see: projects, feedback, and milestones." },
  ];

  return (
    <div className="App main-page about-story-page" id="about-top">
      {/* Fixed image — stays in place; content scrolls above it */}
      <div className="about-image-fixed" aria-hidden="true">
        <img src={AboutImage} alt="" className="about-image-fixed-img" />
      </div>

      {/* Text block — above image, scrolls away */}
      <div className="about-hero-text-block" aria-labelledby="about-hero-heading">
        <span className="main-hero-badge about-hero-badge">Our Story</span>
        <h1 id="about-hero-heading">
          <span className="main-hero-brand">LuminoLearn</span>
          {" "}
          is a learning academy for modern families
        </h1>
        <p className="main-hero-lead">
          We focus on <strong>strong skills</strong>, <strong>clear progress</strong>, and{" "}
          <strong>tech-safe learning</strong> so kids grow with confidence and parents always know
          what's next.
        </p>
        <Link to="/programs" className="main-hero-btn primary about-hero-cta">
          Explore learning paths
        </Link>
      </div>

      {/* Spacer — user scrolls through to see full image; then content enters */}
      <div className="about-image-spacer" aria-hidden="true" />

      {/* Content wrapper — ensures content scrolls ABOVE the fixed image */}
      <div className="about-content-layer">
      <section className="main-value-section about-diff-section" id="what-makes-us-different" aria-labelledby="diff-heading">
        <div className="main-value-inner">
          <h2 id="diff-heading" className="main-value-title">
            What makes LuminoLearn different
          </h2>
          <p className="main-value-sub">Click any card to learn more</p>
          <div className="main-value-grid about-diff-grid">
            {differentiatorCards.map((card, i) => (
              <div
                key={i}
                className={`main-value-card about-diff-card ${expandedCard === i ? "expanded" : ""}`}
                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedCard(expandedCard === i ? null : i);
                  }
                }}
                aria-expanded={expandedCard === i}
              >
                <div className="main-value-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p className="main-value-card-desc">{card.desc}</p>
                {card.pathline && (
                  <span className="about-pathline">{card.pathline}</span>
                )}
                <p className="main-value-card-desc about-card-mini">{card.mini}</p>
                {expandedCard === i && (
                  <div className="main-value-card-tip">
                    <span className="main-value-tip-label">Why it matters</span>
                    <p>{card.tip}</p>
                    <Link to="/programs" className="main-value-card-cta" onClick={(e) => e.stopPropagation()}>
                      Explore paths →
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise — interactive chips */}
      <section className="main-value-section about-promise-section" id="our-promise" aria-labelledby="promise-heading">
        <div className="main-value-inner">
          <h2 id="promise-heading" className="main-value-title">
            Our promise
          </h2>
          <p className="main-value-sub">Confidence first. Progress always.</p>
          <div className="about-promise-content">
            <p className="about-promise-lead">
              We don't overload kids. We build confidence step by step through consistent routines,
              caring instruction, and a learning path that makes growth visible.
            </p>
            <div className="about-promise-chips">
              {promiseChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  className={`about-promise-chip ${expandedChip === chip.id ? "expanded" : ""}`}
                  onClick={() => setExpandedChip(expandedChip === chip.id ? null : chip.id)}
                  aria-expanded={expandedChip === chip.id}
                >
                  <span className="about-chip-label">{chip.label}</span>
                  {expandedChip === chip.id && (
                    <span className="about-chip-desc">{chip.desc}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — LuminoPro-style */}
      <section className="main-value-section about-cta-section" id="get-started" aria-labelledby="cta-heading">
        <div className="main-value-inner">
          <h2 id="cta-heading" className="main-value-title">
            Ready to explore?
          </h2>
          <p className="main-value-sub">
            See our learning paths, meet the structure, and find the right fit for your family.
          </p>
          <div className="main-value-section-cta home-cta-row">
            <Link to="/programs" className="main-hero-btn primary">
              Explore learning paths
            </Link>
            <Link to="/tuition" className="main-hero-btn secondary">
              View tuition
            </Link>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}

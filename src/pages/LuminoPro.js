// src/pages/LuminoPro.js
// LuminoPro — Professional learning for schools, teachers & adult learners
// Styled and interactive like Main page

import React, { useState } from "react";
import "../pages/Main.css";
import "./LuminoPro.css";

const LUMINOPRO_EMAIL = "mailto:lumino@luminolearn.org?subject=LuminoPro%20inquiry";
const LUMINOPRO_CALENDAR_URL = "https://calendly.com/lumino-luminolearn/new-meeting-1";

const audienceCards = [
  {
    icon: "🏫",
    title: "School & district leaders",
    desc: "For principals, PD directors, and coordinators who want coherent professional learning, not one-off workshops.",
    items: [
      "Aligned PD series in math, literacy, and CS/STEM",
      "Implementation coaching for new initiatives",
      "Practical tools teachers can use the next day",
    ],
    tip: "Coherent learning that builds over time.",
  },
  {
    icon: "👩‍🏫",
    title: "Teachers & instructional teams",
    desc: "For educators who want to deepen practice in a supportive, non-judgmental space.",
    items: [
      "High-impact routines for math and literacy",
      "Blending AI and digital tools safely in class",
      "Planning labs with ready-to-adapt lesson ideas",
    ],
    tip: "Designed for real classrooms.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Parents & adult learners",
    desc: "For caregivers and professionals who want clear, focused upskilling without noise.",
    items: [
      "Short courses in digital skills and AI literacy",
      "Coaching on supporting children's learning at home",
      "Flexible formats that fit busy schedules",
    ],
    tip: "Clear, practical, usable the next day.",
  },
];

const offerItems = [
  { title: "Focused PD series", desc: "Multi-session programs in math, literacy, and CS/STEM, aligned to your goals." },
  { title: "Implementation coaching", desc: "Ongoing support as you roll out new practices and tools." },
  { title: "Ready-to-use resources", desc: "Lesson ideas, routines, and templates you can adapt immediately." },
  { title: "AI & digital literacy", desc: "Short courses for educators and parents, practical, not theoretical." },
];

const processSteps = [
  { num: 1, title: "Discovery & needs", desc: "We listen first, to your context, priorities, and existing initiatives, before suggesting any pathway." },
  { num: 2, title: "Program PD design", desc: "We co-design a focused series of sessions with clear outcomes and practical artifacts." },
  { num: 3, title: "Ongoing support", desc: "Optional coaching, office hours, and reflection spaces help teams translate ideas into everyday practice." },
];

export default function LuminoPro() {
  const [expandedAudience, setExpandedAudience] = useState(null);
  const [expandedOffer, setExpandedOffer] = useState(null);

  const openEmail = () => {
    window.location.href = LUMINOPRO_EMAIL;
  };

  const openCalendar = () => {
    window.open(LUMINOPRO_CALENDAR_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="App main-page luminopro-page" id="luminopro-top">
      {/* Section 1: Hero — aligned with Main */}
      <section className="main-hero luminopro-hero">
        <div className="main-hero-inner">
          <span className="main-hero-badge">Professional Learning</span>
          <h1>
            <span className="main-hero-brand">LuminoPro</span>
            {" "}
            for schools, teachers & adult learners
          </h1>
          <p className="main-hero-lead">
            Clear, structured professional development, designed for real classrooms and workplaces.
            No jargon. No fluff. Just practical learning you can use the next day.
          </p>
          <div className="main-hero-actions">
            <button className="main-hero-btn primary" type="button" onClick={openCalendar}>
              Book a short call
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Who We Serve — interactive cards like Main value props */}
      <section className="main-value-section luminopro-section" id="who-we-serve" aria-labelledby="who-we-serve-heading">
        <div className="main-value-inner">
          <h2 id="who-we-serve-heading" className="main-value-title">
            Who LuminoPro serves
          </h2>
          <p className="main-value-sub">Click any card to learn more</p>
          <div className="main-value-grid luminopro-audience-grid">
            {audienceCards.map((card, i) => (
              <div
                key={i}
                className={`main-value-card ${expandedAudience === i ? "expanded" : ""}`}
                onClick={() => setExpandedAudience(expandedAudience === i ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedAudience(expandedAudience === i ? null : i);
                  }
                }}
                aria-expanded={expandedAudience === i}
              >
                <div className="main-value-card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p className="main-value-card-desc">{card.desc}</p>
                <ul className="luminopro-card-list">
                  {card.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
                {expandedAudience === i && (
                  <div className="main-value-card-tip">
                    <span className="main-value-tip-label">Why it matters</span>
                    <p>{card.tip}</p>
                    <button
                      className="main-value-card-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCalendar();
                      }}
                    >
                      Book a call →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: What We Offer — interactive cards */}
      <section className="main-value-section luminopro-offer-section" id="what-we-offer" aria-labelledby="what-we-offer-heading">
        <div className="main-value-inner">
          <h2 id="what-we-offer-heading" className="main-value-title">
            What we offer
          </h2>
          <p className="main-value-sub">Designed for real classrooms. Usable the next day.</p>
          <div className="luminopro-offer-grid">
            {offerItems.map((item, i) => (
              <div
                key={i}
                className={`luminopro-offer-card main-value-card ${expandedOffer === i ? "expanded" : ""}`}
                onClick={() => setExpandedOffer(expandedOffer === i ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedOffer(expandedOffer === i ? null : i);
                  }
                }}
                aria-expanded={expandedOffer === i}
              >
                <h3>{item.title}</h3>
                <p className="main-value-card-desc">{item.desc}</p>
                {expandedOffer === i && (
                  <div className="main-value-card-tip">
                    <button
                      className="main-value-card-cta"
                      onClick={(e) => {
                        e.stopPropagation();
                        openCalendar();
                      }}
                    >
                      Get started →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works — stepper */}
      <section className="main-value-section luminopro-process-section" id="how-it-works" aria-labelledby="how-it-works-heading">
        <div className="main-value-inner">
          <h2 id="how-it-works-heading" className="main-value-title">
            How LuminoPro works
          </h2>
          <div className="luminopro-process-steps">
            {processSteps.map((step, i) => (
              <article key={i} className="luminopro-step main-value-card">
                <div className="luminopro-step-header">
                  <span className="luminopro-step-num" aria-hidden="true">{step.num}</span>
                  <h3>{step.title}</h3>
                </div>
                <p className="main-value-card-desc">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Why LuminoPro */}
      <section className="main-value-section luminopro-why-section" id="why-luminopro" aria-labelledby="why-luminopro-heading">
        <div className="main-value-inner">
          <h2 id="why-luminopro-heading" className="main-value-title">
            Why LuminoPro
          </h2>
          <div className="luminopro-why-content">
            <p className="main-value-sub luminopro-why-lead">
              We focus on clarity, practicality, and real classroom use. No jargon. No fluff.
            </p>
            <ul className="luminopro-why-list">
              <li><strong>Clear structure</strong>: Every session has defined outcomes and takeaway artifacts.</li>
              <li><strong>Practical from day one</strong>: Ideas you can use the next day, not someday.</li>
              <li><strong>Designed for real classrooms</strong>: We work with your context, not generic templates.</li>
              <li><strong>Calm, supportive tone</strong>: Learning happens best when people feel safe to try.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Call to Action */}
      <section className="main-value-section luminopro-cta-section" id="get-started" aria-labelledby="get-started-heading">
        <div className="main-value-inner">
          <h2 id="get-started-heading" className="main-value-title">
            Start a conversation
          </h2>
          <p className="main-value-sub">
            Share a bit about your school or context. We&apos;ll respond with a short, concrete proposal, no pressure, just a conversation.
          </p>
          <div className="main-value-section-cta home-cta-row">
            <button className="main-hero-btn primary" type="button" onClick={openCalendar}>
              Book a short call
            </button>
            <button className="main-hero-btn secondary" type="button" onClick={openEmail}>
              Email the LuminoPro team
            </button>
          </div>
          <p className="luminopro-cta-note">No pressure. No jargon. Just a human response.</p>
        </div>
      </section>
    </div>
  );
}

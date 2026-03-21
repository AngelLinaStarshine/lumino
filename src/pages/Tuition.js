// src/pages/Tuition.js
// Plans & Tuition — Aligned with LuminoPro: main-hero, main-value-section
import React from "react";
import { Link } from "react-router-dom";
import "../pages/Main.css";
import "./Tuition.css";

const WHATSAPP_URL =
  "https://wa.me/14374241380?text=Hi%20LuminoLearn%20%F0%9F%91%8B%20I%20have%20a%20question%20about%20pricing%20and%20learning%20paths.";

export default function Tuition() {
  const openWhatsApp = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="App main-page tuition-page" id="tuition-top">
      {/* Hero — LuminoPro-style */}
      <section className="main-hero tuition-hero">
        <div className="main-hero-inner">
          <span className="main-hero-badge">Plans & Tuition</span>
          <h1>
            <span className="main-hero-brand">LuminoLearn</span>
            {" "}
            plans & tuition
          </h1>
          <p className="main-hero-lead">
            Our tuition follows a clear learning model: everyone begins with{" "}
            <strong>LuminoStart™</strong> (mandatory first month for placement + learning plan),
            then continues into <strong>LuminoCore™</strong> (12-week certified cycle), and can
            extend long-term through <strong>LuminoPath™</strong>.
          </p>
          <div className="main-hero-actions">
            <Link to="/programs" className="main-hero-btn primary">
              Explore learning paths
            </Link>
            <button className="main-hero-btn secondary" type="button" onClick={openWhatsApp}>
              Ask us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* LuminoStart — main-value-section */}
      <section className="main-value-section tuition-section pricing-section" id="luminostart" aria-labelledby="start-heading">
        <div className="main-value-inner">
          <h2 id="start-heading" className="main-value-title">1) LuminoStart™</h2>
          <p className="main-value-sub">Learning Assessment & Placement (Required)</p>
          <div className="tuition-cards">
            <article className="tuition-card tuition-card-start" id="tuition-start">
              <h3 className="tuition-card-title">4 weeks • mandatory for all new students</h3>
              <div className="pricing-table-wrapper">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th className="pricing-head-col">Includes</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Subject-level assessment • learning pace snapshot • guided sessions •
                        personalized plan • placement recommendation
                      </td>
                      <td>
                        <span className="price-main">$349 CAD</span>
                        <span className="price-note">one-time</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="pricing-footer-note">
                LuminoStart™ is the required first month for every learner and ensures the best-fit
                level and pacing before enrolling in LuminoCore™ or LuminoPath™.
              </p>
            </article>
          </div>
          <div className="main-value-section-cta home-cta-row">
            <Link to="/programs" className="main-hero-btn secondary">
              View Learning Paths
            </Link>
            <button className="main-hero-btn primary" type="button" onClick={openWhatsApp}>
              Ask Us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* LuminoCore — main-value-section */}
      <section className="main-value-section tuition-section" id="luminocore" aria-labelledby="core-heading">
        <div className="main-value-inner">
          <h2 id="core-heading" className="main-value-title">2) LuminoCore™</h2>
          <p className="main-value-sub">Certified 12-Week Learning Program</p>
          <div className="tuition-cards">
            <article className="tuition-card tuition-card-core" id="tuition-core">
              <h3 className="tuition-card-title">12 weeks (1 LuminoCycle™) • one subject per program</h3>
              <div className="pricing-table-wrapper">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th className="pricing-head-col">Subject</th>
                      <th>Price (12 weeks)</th>
                      <th>Weekly avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mathematics</td>
                      <td><span className="price-main">$1,150 CAD</span></td>
                      <td>~$96/week</td>
                    </tr>
                    <tr>
                      <td>English (Language & Literacy)</td>
                      <td><span className="price-main">$1,100 CAD</span></td>
                      <td>~$92/week</td>
                    </tr>
                    <tr>
                      <td>Computer Science</td>
                      <td><span className="price-main">$1,200 CAD</span></td>
                      <td>~$100/week</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="pricing-footer-note">
                Each LuminoCore™ includes guided instruction, personalized practice, projects,
                teacher feedback, a certificate, and a parent progress report.
              </p>
            </article>
          </div>
          <div className="main-value-section-cta home-cta-row">
            <Link to="/programs" className="main-hero-btn secondary">
              Explore Programs
            </Link>
            <button className="main-hero-btn primary" type="button" onClick={openWhatsApp}>
              Ask Us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* LuminoPath — main-value-section */}
      <section className="main-value-section tuition-section" id="luminopath" aria-labelledby="path-heading">
        <div className="main-value-inner">
          <h2 id="path-heading" className="main-value-title">3) LuminoPath™</h2>
          <p className="main-value-sub">Personalized Long-Term Learning</p>
          <div className="tuition-cards">
            <article className="tuition-card tuition-card-path" id="tuition-path">
              <h3 className="tuition-card-title">Best value • bundles multiple LuminoCore™ cycles</h3>
              <div className="pricing-table-wrapper">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th className="pricing-head-col">Pathway</th>
                      <th>Duration</th>
                      <th>Includes</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>LuminoPath™ 3</td>
                      <td>3 months</td>
                      <td>1 LuminoCore™</td>
                      <td><span className="price-main">$1,150-$1,200</span><span className="price-note">depends on subject</span></td>
                    </tr>
                    <tr>
                      <td>LuminoPath™ 6</td>
                      <td>6 months</td>
                      <td>2 LuminoCore™</td>
                      <td><span className="price-main">$2,050 CAD</span></td>
                    </tr>
                    <tr>
                      <td>LuminoPath™ 9</td>
                      <td>9 months</td>
                      <td>3 LuminoCore™</td>
                      <td><span className="price-main">$2,950 CAD</span></td>
                    </tr>
                    <tr>
                      <td>LuminoPath™ 12</td>
                      <td>12 months</td>
                      <td>4 LuminoCore™</td>
                      <td><span className="price-main">$3,750 CAD</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="pricing-footer-note">
                LuminoPath™ includes ongoing personalization, priority scheduling, and regular
                progress reports with a clear next-step roadmap.
              </p>
            </article>
          </div>
          <div className="main-value-section-cta home-cta-row">
            <Link to="/programs" className="main-hero-btn secondary">
              View Learning Paths
            </Link>
            <button className="main-hero-btn primary" type="button" onClick={openWhatsApp}>
              Ask Us on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* CTA — LuminoPro-style */}
      <section className="main-value-section tuition-cta-section" id="get-started" aria-labelledby="tuition-cta-heading">
        <div className="main-value-inner">
          <h2 id="tuition-cta-heading" className="main-value-title">Questions about pricing?</h2>
          <p className="main-value-sub">
            Simple, transparent pricing for families in Ontario. We'll guide you.
          </p>
          <div className="main-value-section-cta home-cta-row">
            <button className="main-hero-btn primary" type="button" onClick={openWhatsApp}>
              Ask Us on WhatsApp
            </button>
            <Link to="/programs" className="main-hero-btn secondary">
              Explore Programs
            </Link>
            <Link to="/our-story" className="main-hero-btn secondary">
              Our story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

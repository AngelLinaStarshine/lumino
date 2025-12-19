// src/pages/Tuition.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Tuition.css";

const WHATSAPP_URL =
  "https://wa.me/14374241380?text=Hi%20LuminoLearn%20%F0%9F%91%8B%20I%20have%20a%20question%20about%20pricing%20and%20learning%20paths.";

export default function Tuition() {
  const navigate = useNavigate();

  const openWhatsApp = () => {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="simple-page">
      {/* =========================
          OPTION 1 (FULL-WIDTH) — PREMIUM BACKGROUND
          LuminoStart™
         ========================= */}
      <section className="tuition-band band-premium">
        <div className="tuition-inner">
          <div className="tuition-surface">
            <h1>Plans &amp; Tuition</h1>

            <p className="lead">
              Our tuition follows a clear learning model: start with{" "}
              <strong>LuminoStart™</strong> (placement sprint), then enroll in{" "}
              <strong>LuminoCore™</strong> (12-week certified cycle), and continue with{" "}
              <strong>LuminoPath™</strong> for long-term growth.
            </p>

            <section className="pricing-section" style={{ borderRadius: "16px" }}>
              <div className="pricing-inner">
                <h2 className="pricing-title">LuminoLearn Pricing (Ages 9–11)</h2>
                <p className="pricing-intro">
                  Simple, transparent pricing designed for modern families in Ontario.
                  If you’re unsure where to start, we’ll guide you.
                </p>

                {/* 1) LuminoStart */}
                <div className="pricing-block">
                  <h3 className="pricing-block-title">
                    1) LuminoStart™ — Learning Assessment &amp; Placement
                  </h3>
                  <p className="pricing-block-sub">
                    <strong>4 weeks</strong> • required for all new students
                  </p>

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
                    LuminoStart™ may be credited toward LuminoPath™ enrollment (optional incentive).
                  </p>
                </div>
              </div>
            </section>

            {/* CTA (inside Option 1) */}
            <div className="home-cta-row" style={{ marginTop: "1.25rem" }}>
              <button className="home-cta secondary" onClick={() => navigate("/programs")}>
                View Learning Paths
              </button>
              <button className="home-cta primary" onClick={openWhatsApp}>
                Ask Us on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          OPTION 2 (FULL-WIDTH) — WHITE BACKGROUND
          LuminoCore™
         ========================= */}
      <section className="tuition-band band-white">
        <div className="tuition-inner">
          <div className="tuition-surface">
            <section className="pricing-section" style={{ borderRadius: "16px" }}>
              <div className="pricing-inner">
                {/* 2) LuminoCore */}
                <div className="pricing-block">
                  <h3 className="pricing-block-title">
                    2) LuminoCore™ — Certified 12-Week Learning Program
                  </h3>
                  <p className="pricing-block-sub">
                    <strong>12 weeks</strong> (1 LuminoCycle™) • one subject per program
                  </p>

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
                          <td>
                            <span className="price-main">$1,150 CAD</span>
                          </td>
                          <td>~$96/week</td>
                        </tr>
                        <tr>
                          <td>English (Language &amp; Literacy)</td>
                          <td>
                            <span className="price-main">$1,100 CAD</span>
                          </td>
                          <td>~$92/week</td>
                        </tr>
                        <tr>
                          <td>Computer Science</td>
                          <td>
                            <span className="price-main">$1,200 CAD</span>
                          </td>
                          <td>~$100/week</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="pricing-footer-note">
                    Each LuminoCore™ includes guided instruction, personalized practice, projects,
                    teacher feedback, a certificate, and a parent progress report.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA (inside Option 2) */}
            <div className="home-cta-row" style={{ marginTop: "1.25rem" }}>
              <button className="home-cta secondary" onClick={() => navigate("/programs")}>
                Explore Programs
              </button>
              <button className="home-cta primary" onClick={openWhatsApp}>
                Ask Us on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          OPTION 3 (FULL-WIDTH) — TIFFANY BACKGROUND
          LuminoPath™ + Mentor
         ========================= */}
      <section className="tuition-band band-tiffany">
        <div className="tuition-inner">
          <div className="tuition-surface">
            <section className="pricing-section" style={{ borderRadius: "16px" }}>
              <div className="pricing-inner">
                {/* 3) LuminoPath */}
                <div className="pricing-block">
                  <h3 className="pricing-block-title">
                    3) LuminoPath™ — Personalized Long-Term Learning
                  </h3>
                  <p className="pricing-block-sub">
                    Best value • bundles multiple LuminoCore™ cycles into one continuous plan
                  </p>

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
                          <td>
                            <span className="price-main">$1,150–$1,200</span>
                            <span className="price-note">depends on subject</span>
                          </td>
                        </tr>
                        <tr>
                          <td>LuminoPath™ 6</td>
                          <td>6 months</td>
                          <td>2 LuminoCore™</td>
                          <td>
                            <span className="price-main">$2,050 CAD</span>
                          </td>
                        </tr>
                        <tr>
                          <td>LuminoPath™ 9</td>
                          <td>9 months</td>
                          <td>3 LuminoCore™</td>
                          <td>
                            <span className="price-main">$2,950 CAD</span>
                          </td>
                        </tr>
                        <tr>
                          <td>LuminoPath™ 12</td>
                          <td>12 months</td>
                          <td>4 LuminoCore™</td>
                          <td>
                            <span className="price-main">$3,750 CAD</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="pricing-footer-note">
                    LuminoPath™ includes ongoing personalization, priority scheduling, and regular
                    progress reports with a clear next-step roadmap.
                  </p>
                </div>

                {/* Optional Add-on */}
                <div className="pricing-block" style={{ marginTop: "1.25rem" }}>
                  <h3 className="pricing-block-title">Optional Add-On: LuminoMentor™ Support</h3>

                  <div className="pricing-table-wrapper">
                    <table className="pricing-table">
                      <thead>
                        <tr>
                          <th className="pricing-head-col">Option</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Small Group Mentoring</td>
                          <td>
                            <span className="price-main">$180/month</span>
                          </td>
                        </tr>
                        <tr>
                          <td>1:1 Mentoring</td>
                          <td>
                            <span className="price-main">$250/month</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="pricing-footer-note">
                    Great for confidence, homework guidance, and steady weekly accountability.
                  </p>
                </div>
              </div>
            </section>

            {/* CTA (inside Option 3) */}
            <div className="home-cta-row" style={{ marginTop: "1.25rem" }}>
              <button className="home-cta secondary" onClick={() => navigate("/programs")}>
                View Learning Paths
              </button>
              <button className="home-cta primary" onClick={openWhatsApp}>
                Ask Us on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// src/pages/PersonalAccount.js
import React, { useEffect, useMemo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalAccount.css";
import { AuthContext } from "../auth/AuthContext";

function PersonalAccount() {
  const navigate = useNavigate();
  // ✅ read session/user from AuthContext
  const { user, authLoading } = useContext(AuthContext);

  // ✅ Prod: "" so calls go to "/api/..." (Netlify redirect)
  // ✅ Local: set REACT_APP_API_BASE=http://localhost:5000
  const API_BASE = useMemo(() => {
    return (process.env.REACT_APP_API_BASE || "").replace(/\/$/, "");
  }, []);

  const [activeTab, setActiveTab] = useState("dashboard");

  // ✅ Progress report (for Overview course-specific display)
  const [progressReport, setProgressReport] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [progressError, setProgressError] = useState("");


  // Load Calendly script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // ✅ Enrolled course: Number Ninjas, Word Wizards, or Code Explorers (from user or progress)
  const enrolledCourse = useMemo(() => {
    const fromUser = user?.enrolled_program || user?.enrolled_course;
    if (fromUser) return fromUser;
    const firstCourse = progressReport?.courses?.[0]?.className;
    if (firstCourse) return firstCourse;
    return user?.enrolled_program || "Number Ninjas"; // default for UI
  }, [user, progressReport]);

  // ✅ Progress summary for Overview
  const progressSummary = useMemo(() => {
    if (!progressReport?.summary) return null;
    const s = progressReport.summary;
    return {
      overallStatus: s.overallStatus || "—",
      attendancePct:
        typeof s.attendancePct === "number" ? `${s.attendancePct}%` : "—",
      gpa: s.gpa ?? "—",
      lastUpdated: s.lastUpdated || "—",
      completionPct:
        typeof s.completionPct === "number" ? `${s.completionPct}%` : progressReport?.courses?.[0]?.progressPct != null ? `${progressReport.courses[0].progressPct}%` : "—",
      score: s.score ?? progressReport?.courses?.[0]?.grade ?? "—",
    };
  }, [progressReport]);

  // ✅ Fetch progress report for Overview
  useEffect(() => {
    const run = async () => {
      if (!user?.email) {
        setLoadingProgress(false);
        return;
      }

      setLoadingProgress(true);
      setProgressError("");

      try {
        const res = await fetch(
          `${API_BASE}/api/progress/${encodeURIComponent(user.email)}`,
          { credentials: "include" }
        );

        // ✅ if you haven't created this backend route yet
        if (res.status === 404) {
          setProgressReport(null);
          setProgressError("Progress report is not available yet.");
          return;
        }

        if (!res.ok) throw new Error("Failed to load progress report.");
        const data = await res.json();
        setProgressReport(data || null);
      } catch (e) {
        setProgressError(e?.message || "Could not load progress report.");
      } finally {
        setLoadingProgress(false);
      }
    };

    run();
  }, [API_BASE, user?.email]);

  // ✅ Safe early returns AFTER hooks
  if (authLoading) {
    return <p className="account-loading">Loading your account…</p>;
  }

  if (!user) {
    return (
      <div className="account-page">
        <p className="account-loading">You are not logged in. Please sign in.</p>
      </div>
    );
  }

  const fullName = user.full_name || "LuminoLearn Family";
  const subscription = user.subscription || "No active subscription yet";
  const paymentHistory = Array.isArray(user.paymentHistory)
    ? user.paymentHistory
    : [];
  const paymentCount = paymentHistory.length;

  return (
    <div className="account-page">
      {/* Top overview hero */}
      <section className="account-hero">
        <p className="account-hero-kicker">Personal Learning Space</p>
        <h1 className="account-hero-title">
          Welcome back, <span className="account-hero-name">{fullName}</span>
        </h1>
        <p className="account-hero-sub">
          Your course overview, profile, and payments — all in one calm space.
        </p>

        <div className="account-hero-badges">
          <div className="hero-badge">
            <span className="hero-badge-label">Subscription</span>
            <span className="hero-badge-value">{subscription}</span>
          </div>

          <div className="hero-badge">
            <span className="hero-badge-label">Payments on record</span>
            <span className="hero-badge-value">{paymentCount}</span>
          </div>
        </div>
      </section>

      {/* LMS-style shell with sidebar navigation */}
      <div className="account-shell">
        <aside className="account-sidebar">
          <p className="account-nav-title">My space</p>
          <div className="account-nav-list">
            <button
              type="button"
              className={`account-nav-item ${
                activeTab === "dashboard" ? "is-active" : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Overview
            </button>
            <button
              type="button"
              className={`account-nav-item ${
                activeTab === "info" ? "is-active" : ""
              }`}
              onClick={() => setActiveTab("info")}
            >
              My information
            </button>
            <button
              type="button"
              className={`account-nav-item ${
                activeTab === "payments" ? "is-active" : ""
              }`}
              onClick={() => setActiveTab("payments")}
            >
              Payments
            </button>
          </div>
          <hr className="account-divider" style={{ margin: "1rem 0" }} />
          <button
            type="button"
            className="account-nav-item"
            onClick={() => navigate("/lms")}
            style={{ fontSize: "0.9rem" }}
          >
            Lumino LMS →
          </button>
        </aside>

        <main className="account-main">
          {activeTab === "dashboard" && (
            <div className="account-column">
              <section className="account-card account-overview-course">
                <div className="account-section-header">
                  <div>
                    <span className="section-icon">📊</span>
                    <span className="section-title">Overview</span>
                  </div>
                </div>
                <div className="account-section-body">
                  <div className="account-course-badge">
                    {enrolledCourse === "Number Ninjas" && "🔢"}
                    {enrolledCourse === "Word Wizards" && "📚"}
                    {enrolledCourse === "Code Explorers" && "💻"}
                    {!["Number Ninjas", "Word Wizards", "Code Explorers"].includes(enrolledCourse) && "✨"}
                    <strong>{enrolledCourse}</strong>
                  </div>
                  <p className="account-hint">
                    Your progress, classes, and work are in{" "}
                    <button type="button" className="account-inline-link" onClick={() => navigate("/lms")}>
                      Lumino LMS
                    </button>
                    .
                  </p>
                  {loadingProgress ? (
                    <p>Loading program progress…</p>
                  ) : progressReport || progressSummary ? (
                    <div className="account-overview-stats">
                      <div className="account-overview-stat">
                        <span className="account-overview-stat-label">Score</span>
                        <span className="account-overview-stat-value">
                          {progressSummary?.score ?? progressSummary?.gpa ?? "—"}
                        </span>
                      </div>
                      <div className="account-overview-stat">
                        <span className="account-overview-stat-label">Completion</span>
                        <span className="account-overview-stat-value">
                          {progressSummary?.completionPct ?? "—"}
                        </span>
                      </div>
                      <div className="account-overview-stat">
                        <span className="account-overview-stat-label">Achievement</span>
                        <span className="account-overview-stat-value">
                          {progressSummary?.overallStatus ?? "—"}
                        </span>
                      </div>
                      <div className="account-overview-stat">
                        <span className="account-overview-stat-label">Updated</span>
                        <span className="account-overview-stat-value">
                          {progressSummary?.lastUpdated ?? "—"}
                        </span>
                      </div>
                    </div>
                  ) : progressError ? (
                    <p className="account-error">{progressError}</p>
                  ) : (
                    <p>Complete your first lesson in Lumino LMS to see your progress here.</p>
                  )}
                </div>
              </section>
            </div>
          )}

          {activeTab === "info" && (
            <section className="account-card">
              <div className="account-section-header">
                <div>
                  <span className="section-icon">👤</span>
                  <span className="section-title">My information</span>
                </div>
              </div>
              <div className="account-section-body">
                <p>
                  <strong>Name:</strong> {fullName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email || "—"}
                </p>
                <p>
                  <strong>Role:</strong> {user.role || "—"}
                </p>
                <p>
                  <strong>Subscription:</strong> {subscription}
                </p>

                <hr className="account-divider" />

                <p className="account-hint">
                  If any of this information is incorrect, please contact the
                  LuminoLearn team so we can update it on your behalf.
                </p>
              </div>
            </section>
          )}

          {activeTab === "payments" && (
            <section className="account-card">
              <div className="account-section-header">
                <div>
                  <span className="section-icon">💳</span>
                  <span className="section-title">Payments & billing</span>
                </div>
              </div>
              <div className="account-section-body">
                {paymentHistory.length > 0 ? (
                  <ul className="payment-list">
                    {paymentHistory.map((p, idx) => {
                      const status = (p.status || "pending").toLowerCase();
                      const statusClass =
                        status === "paid"
                          ? "payment-status-paid"
                          : status === "failed"
                          ? "payment-status-failed"
                          : "payment-status-pending";
                      return (
                        <li
                          key={p.id || idx}
                          className="payment-list-item"
                        >
                          <span className="payment-date">
                            {p.date || p.createdAt || "—"}
                          </span>
                          <span className="payment-amount">
                            {p.amount || p.total || "—"}
                          </span>
                          <span
                            className={`payment-status ${statusClass}`}
                          >
                            {p.status || "Pending"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>No payments recorded yet.</p>
                )}

                <hr className="account-divider" />

                <p className="account-hint">
                  For any billing questions or receipt copies, please reach out
                  to us by email and we&apos;ll be happy to help.
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default PersonalAccount;

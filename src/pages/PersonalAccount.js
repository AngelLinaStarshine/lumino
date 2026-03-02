// src/pages/PersonalAccount.js
import React, { useEffect, useMemo, useState, useContext } from "react";
import "./PersonalAccount.css";
import { AuthContext } from "../auth/AuthContext";

function PersonalAccount() {
  // ✅ read session/user from AuthContext
  const { user, authLoading } = useContext(AuthContext);

  // ✅ Prod: "" so calls go to "/api/..." (Netlify redirect)
  // ✅ Local: set REACT_APP_API_BASE=http://localhost:5000
  const API_BASE = useMemo(() => {
    return (process.env.REACT_APP_API_BASE || "").replace(/\/$/, "");
  }, []);

  const [activeTab, setActiveTab] = useState("dashboard");

  // ✅ Student Links (from YOUR DB: public.student_links)
  const [studentLinks, setStudentLinks] = useState(null);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [linksError, setLinksError] = useState("");

  // ✅ Progress report (optional / if route exists)
  const [progressReport, setProgressReport] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [progressError, setProgressError] = useState("");

  // ✅ Student submissions (optional / if route exists)
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [subsError, setSubsError] = useState("");

  // Upload form
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadNote, setUploadNote] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  // Load Calendly script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // ✅ Safe progress summary
  const progressSummary = useMemo(() => {
    if (!progressReport?.summary) return null;
    const s = progressReport.summary;
    return {
      overallStatus: s.overallStatus || "—",
      attendancePct:
        typeof s.attendancePct === "number" ? `${s.attendancePct}%` : "—",
      gpa: s.gpa ?? "—",
      lastUpdated: s.lastUpdated || "—",
    };
  }, [progressReport]);

  // ✅ 1) Fetch student links from DB
  useEffect(() => {
    const run = async () => {
      if (!user?.email) {
        setLoadingLinks(false);
        return;
      }

      setLoadingLinks(true);
      setLinksError("");

      try {
        const res = await fetch(
          `${API_BASE}/api/student-links/${encodeURIComponent(user.email)}`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Failed to load your class links.");
        const data = await res.json();

        setStudentLinks(data || null);
      } catch (e) {
        setLinksError(e?.message || "Could not load your class links.");
      } finally {
        setLoadingLinks(false);
      }
    };

    run();
  }, [API_BASE, user?.email]);

  // ✅ 2) Fetch progress report (IF backend route exists)
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

  // ✅ 3) Fetch student submissions list (IF backend route exists)
  useEffect(() => {
    const run = async () => {
      if (!user?.email) {
        setLoadingSubs(false);
        return;
      }

      setLoadingSubs(true);
      setSubsError("");

      try {
        const res = await fetch(
          `${API_BASE}/api/submissions/${encodeURIComponent(user.email)}`,
          { credentials: "include" }
        );

        // ✅ if you haven't created this backend route yet
        if (res.status === 404) {
          setSubmissions([]);
          setSubsError("Submissions feature is not enabled yet.");
          return;
        }

        if (!res.ok) throw new Error("Failed to load submissions.");
        const data = await res.json();

        setSubmissions(Array.isArray(data?.submissions) ? data.submissions : []);
      } catch (e) {
        setSubsError(e?.message || "Could not load submissions.");
      } finally {
        setLoadingSubs(false);
      }
    };

    run();
  }, [API_BASE, user?.email]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadMsg("");

    if (!user?.email) {
      setUploadMsg("No user email found. Please log in again.");
      return;
    }
    if (!uploadFile) {
      setUploadMsg("Please choose a file to upload.");
      return;
    }
    if (!uploadTitle.trim()) {
      setUploadMsg("Please add a title for the work.");
      return;
    }

    setUploading(true);
    try {
      const form = new FormData();
      form.append("email", user.email);
      form.append("title", uploadTitle.trim());
      form.append("note", uploadNote.trim());
      form.append("file", uploadFile);

      const res = await fetch(`${API_BASE}/api/submissions/upload`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (res.status === 404) {
        throw new Error("Uploads are not enabled yet.");
      }

      if (!res.ok) throw new Error("Upload failed. Please try again.");
      const data = await res.json();

      if (Array.isArray(data?.submissions)) {
        setSubmissions(data.submissions);
      } else if (data?.submission) {
        setSubmissions((prev) => [data.submission, ...prev]);
      }

      setUploadTitle("");
      setUploadNote("");
      setUploadFile(null);
      setUploadMsg("✅ Uploaded successfully!");
    } catch (err) {
      setUploadMsg(err?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

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

  const hasGC = !!studentLinks?.google_classroom_url;
  const hasMeet = !!studentLinks?.class_meeting_url;

  // ✅ FIXED: correct math
  const linkCount = (hasGC ? 1 : 0) + (hasMeet ? 1 : 0);

  return (
    <div className="account-page">
      {/* Top overview hero */}
      <section className="account-hero">
        <p className="account-hero-kicker">Personal Learning Space</p>
        <h1 className="account-hero-title">
          Welcome back, <span className="account-hero-name">{fullName}</span>
        </h1>
        <p className="account-hero-sub">
          Track class links, progress, certificates, payment plans, upload work,
          and book a call — all in one calm, organized space.
        </p>

        <div className="account-hero-badges">
          <div className="hero-badge">
            <span className="hero-badge-label">Subscription</span>
            <span className="hero-badge-value">{subscription}</span>
          </div>

          <div className="hero-badge">
            <span className="hero-badge-label">Class Links</span>
            <span className="hero-badge-value">
              {loadingLinks
                ? "…"
                : linkCount > 0
                ? `${linkCount} link${linkCount === 1 ? "" : "s"}`
                : "No links yet"}
            </span>
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
                activeTab === "classes" ? "is-active" : ""
              }`}
              onClick={() => setActiveTab("classes")}
            >
              Classes & links
            </button>
            <button
              type="button"
              className={`account-nav-item ${
                activeTab === "progress" ? "is-active" : ""
              }`}
              onClick={() => setActiveTab("progress")}
            >
              Progress
            </button>
            <button
              type="button"
              className={`account-nav-item ${
                activeTab === "work" ? "is-active" : ""
              }`}
              onClick={() => setActiveTab("work")}
            >
              Uploads & work
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
        </aside>

        <main className="account-main">
          {activeTab === "dashboard" && (
            <div className="account-column">
              <section className="account-card">
                <div className="account-section-header">
                  <div>
                    <span className="section-icon">📊</span>
                    <span className="section-title">Quick snapshot</span>
                  </div>
                </div>
                <div className="account-section-body">
                  {progressReport ? (
                    <>
                      <div className="progress-summary">
                        <div className="progress-chip">
                          <span className="progress-label">Overall</span>
                          <span className="progress-value">
                            {progressSummary?.overallStatus || "—"}
                          </span>
                        </div>
                        <div className="progress-chip">
                          <span className="progress-label">Attendance</span>
                          <span className="progress-value">
                            {progressSummary?.attendancePct || "—"}
                          </span>
                        </div>
                        <div className="progress-chip">
                          <span className="progress-label">GPA</span>
                          <span className="progress-value">
                            {progressSummary?.gpa || "—"}
                          </span>
                        </div>
                        <div className="progress-chip">
                          <span className="progress-label">Updated</span>
                          <span className="progress-value">
                            {progressSummary?.lastUpdated || "—"}
                          </span>
                        </div>
                      </div>
                      <p className="account-hint">
                        This is a summary view. Open the{" "}
                        <strong>Progress</strong> tab for course-level details.
                      </p>
                    </>
                  ) : loadingProgress ? (
                    <p>Loading progress summary…</p>
                  ) : (
                    <p>No progress report is available yet.</p>
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

          {activeTab === "classes" && (
            <section className="account-card">
              <div className="account-section-header">
                <div>
                  <span className="section-icon">🏫</span>
                  <span className="section-title">Classes & links</span>
                </div>
              </div>
              <div className="account-section-body">
                {loadingLinks ? (
                  <p>Loading your links…</p>
                ) : linksError ? (
                  <p className="account-error">{linksError}</p>
                ) : studentLinks ? (
                  <>
                    {studentLinks.google_classroom_url ? (
                      <a
                        className="course-link"
                        href={studentLinks.google_classroom_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Google Classroom ↗
                      </a>
                    ) : (
                      <p>No Google Classroom link yet.</p>
                    )}

                    <div style={{ height: 10 }} />

                    {studentLinks.class_meeting_url ? (
                      <a
                        className="course-link"
                        href={studentLinks.class_meeting_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join class meeting ↗
                      </a>
                    ) : (
                      <p>No class meeting link yet.</p>
                    )}
                  </>
                ) : (
                  <p>No links found yet.</p>
                )}

                <hr className="account-divider" />

                <p className="account-hint">
                  These links are managed by your teacher or program lead. If
                  anything looks out of date, please let us know.
                </p>
              </div>
            </section>
          )}

          {activeTab === "progress" && (
            <section className="account-card">
              <div className="account-section-header">
                <div>
                  <span className="section-icon">📈</span>
                  <span className="section-title">
                    Progress report & review
                  </span>
                </div>
              </div>
              <div className="account-section-body">
                {loadingProgress ? (
                  <p>Loading progress report…</p>
                ) : progressError ? (
                  <p className="account-error">{progressError}</p>
                ) : progressReport ? (
                  <>
                    <div className="progress-summary">
                      <div className="progress-chip">
                        <span className="progress-label">Overall</span>
                        <span className="progress-value">
                          {progressSummary?.overallStatus || "—"}
                        </span>
                      </div>
                      <div className="progress-chip">
                        <span className="progress-label">Attendance</span>
                        <span className="progress-value">
                          {progressSummary?.attendancePct || "—"}
                        </span>
                      </div>
                      <div className="progress-chip">
                        <span className="progress-label">GPA</span>
                        <span className="progress-value">
                          {progressSummary?.gpa || "—"}
                        </span>
                      </div>
                      <div className="progress-chip">
                        <span className="progress-label">Updated</span>
                        <span className="progress-value">
                          {progressSummary?.lastUpdated || "—"}
                        </span>
                      </div>
                    </div>

                    {Array.isArray(progressReport?.courses) &&
                    progressReport.courses.length > 0 ? (
                      <ul className="progress-course-list">
                        {progressReport.courses.map((p, i) => (
                          <li
                            key={p.classId || i}
                            className="progress-course-item"
                          >
                            <div className="progress-course-head">
                              <p className="course-title">
                                {p.className || "Class"}
                              </p>
                              <span className="progress-pill">
                                {typeof p.progressPct === "number"
                                  ? `${p.progressPct}%`
                                  : "—"}
                              </span>
                            </div>

                            <p className="course-meta">
                              <strong>Current grade:</strong> {p.grade ?? "—"}
                            </p>

                            {p.teacherNote && (
                              <p className="teacher-note">
                                <strong>Teacher note:</strong> {p.teacherNote}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No course-level progress yet.</p>
                    )}
                  </>
                ) : (
                  <p>No progress report found yet.</p>
                )}
              </div>
            </section>
          )}

          {activeTab === "work" && (
            <section className="account-card">
              <div className="account-section-header">
                <div>
                  <span className="section-icon">📤</span>
                  <span className="section-title">Upload student work</span>
                </div>
              </div>
              <div className="account-section-body">
                <form className="upload-form" onSubmit={handleUpload}>
                  <label className="upload-label">
                    Title
                    <input
                      className="upload-input"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      placeholder="e.g., Math Homework Week 3"
                    />
                  </label>

                  <label className="upload-label">
                    Note (optional)
                    <textarea
                      className="upload-textarea"
                      value={uploadNote}
                      onChange={(e) => setUploadNote(e.target.value)}
                      placeholder="Any note for the teacher?"
                      rows={3}
                    />
                  </label>

                  <label className="upload-label">
                    File
                    <input
                      className="upload-input"
                      type="file"
                      onChange={(e) =>
                        setUploadFile(e.target.files?.[0] || null)
                      }
                    />
                  </label>

                  <button
                    className="upload-btn"
                    type="submit"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading…" : "Upload"}
                  </button>

                  {uploadMsg && <p className="upload-msg">{uploadMsg}</p>}
                </form>

                <hr className="account-divider" />

                <h3 className="mini-title">Previous submissions</h3>

                {loadingSubs ? (
                  <p>Loading submissions…</p>
                ) : subsError ? (
                  <p className="account-error">{subsError}</p>
                ) : submissions.length > 0 ? (
                  <ul className="submission-list">
                    {submissions.map((s, i) => (
                      <li key={s.id || i} className="submission-item">
                        <div className="submission-row">
                          <p className="submission-title">
                            {s.title || "Untitled"}
                          </p>
                          <span
                            className={`submission-status status-${(
                              s.status || "pending"
                            ).toLowerCase()}`}
                          >
                            {s.status || "Pending"}
                          </span>
                        </div>

                        <p className="submission-meta">
                          <strong>Uploaded:</strong> {s.uploadedAt || "—"}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No submissions yet.</p>
                )}
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

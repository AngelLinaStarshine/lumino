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

  const [expanded, setExpanded] = useState("overview");

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

  const toggleSection = (section) => {
    setExpanded((prev) => (prev === section ? null : section));
  };

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
  const paymentCount = Array.isArray(user.paymentHistory)
    ? user.paymentHistory.length
    : 0;

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

      {/* Main layout */}
      <div className="account-grid">
        {/* LEFT */}
        <div className="account-column">
          {/* My Information */}
          <section className="account-card">
            <button
              onClick={() => toggleSection("info")}
              className="account-section-header"
              type="button"
            >
              <div>
                <span className="section-icon">👤</span>
                <span className="section-title">My Information</span>
              </div>
              <span className="section-toggle-indicator">
                {expanded === "info" ? "−" : "+"}
              </span>
            </button>

            {expanded === "info" && (
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
                  Tip: Your teacher can add your Google Classroom + meeting link
                  directly to your account.
                </p>
              </div>
            )}
          </section>

          {/* ✅ Class Links (DB-backed) */}
          <section className="account-card">
            <button
              onClick={() => toggleSection("classes")}
              className="account-section-header"
              type="button"
            >
              <div>
                <span className="section-icon">🏫</span>
                <span className="section-title">Class Links</span>
              </div>
              <span className="section-toggle-indicator">
                {expanded === "classes" ? "−" : "+"}
              </span>
            </button>

            {expanded === "classes" && (
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
                        Join Class Meeting ↗
                      </a>
                    ) : (
                      <p>No class meeting link yet.</p>
                    )}
                  </>
                ) : (
                  <p>No links found yet.</p>
                )}
              </div>
            )}
          </section>

          {/* Progress Report */}
          <section className="account-card">
            <button
              onClick={() => toggleSection("progress")}
              className="account-section-header"
              type="button"
            >
              <div>
                <span className="section-icon">📈</span>
                <span className="section-title">Progress Report & Review</span>
              </div>
              <span className="section-toggle-indicator">
                {expanded === "progress" ? "−" : "+"}
              </span>
            </button>

            {expanded === "progress" && (
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
            )}
          </section>
        </div>

        {/* RIGHT */}
        <div className="account-column">
          {/* Upload Work */}
          <section className="account-card">
            <button
              onClick={() => toggleSection("upload")}
              className="account-section-header"
              type="button"
            >
              <div>
                <span className="section-icon">📤</span>
                <span className="section-title">Upload Student Work</span>
              </div>
              <span className="section-toggle-indicator">
                {expanded === "upload" ? "−" : "+"}
              </span>
            </button>

            {expanded === "upload" && (
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

                <h3 className="mini-title">Previous Submissions</h3>

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
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default PersonalAccount;

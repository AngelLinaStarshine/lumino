// src/pages/StudentLMS.js – Classroom + Canva style student LMS
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentLMS.css";
import { AuthContext } from "../auth/AuthContext";

export default function StudentLMS() {
  const navigate = useNavigate();
  const { user, API_BASE } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("stream");
  const [studentLinks, setStudentLinks] = useState(null);
  const [loadingLinks, setLoadingLinks] = useState(true);
  const [linksError, setLinksError] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [progressReport, setProgressReport] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [progressError, setProgressError] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadNote, setUploadNote] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  const fullName = user?.full_name || "Lumino Learner";
  const classCards = [
    {
      id: "gc",
      title: "Google Classroom",
      subtitle: "Assignments & materials",
      url: studentLinks?.google_classroom_url,
      icon: "📚",
      color: "gc",
    },
    {
      id: "meet",
      title: "Class meeting",
      subtitle: "Join live sessions",
      url: studentLinks?.class_meeting_url,
      icon: "📹",
      color: "meet",
    },
  ].filter((c) => c.url);

  useEffect(() => {
    const run = async () => {
      if (!user?.email || !API_BASE) {
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
        if (!res.ok) throw new Error("Failed to load class links");
        const data = await res.json();
        setStudentLinks(data || null);
      } catch (e) {
        setLinksError(e?.message || "Could not load class links");
      } finally {
        setLoadingLinks(false);
      }
    };
    run();
  }, [API_BASE, user?.email]);

  useEffect(() => {
    const run = async () => {
      if (!user?.email || !API_BASE) {
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
        if (res.status === 404) {
          setProgressReport(null);
          return;
        }
        if (!res.ok) throw new Error("Failed to load progress");
        const data = await res.json();
        setProgressReport(data || null);
      } catch (e) {
        setProgressError(e?.message || "Could not load progress");
      } finally {
        setLoadingProgress(false);
      }
    };
    run();
  }, [API_BASE, user?.email]);

  useEffect(() => {
    const run = async () => {
      if (!user?.email || !API_BASE) {
        setLoadingSubs(false);
        return;
      }
      setLoadingSubs(true);
      try {
        const res = await fetch(
          `${API_BASE}/api/submissions/${encodeURIComponent(user.email)}`,
          { credentials: "include" }
        );
        if (res.status === 404) {
          setSubmissions([]);
          return;
        }
        if (!res.ok) throw new Error("Failed to load submissions");
        const data = await res.json();
        setSubmissions(Array.isArray(data?.submissions) ? data.submissions : []);
      } catch {
        setSubmissions([]);
      } finally {
        setLoadingSubs(false);
      }
    };
    run();
  }, [API_BASE, user?.email]);

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadMsg("");
    if (!user?.email || !uploadFile || !uploadTitle.trim()) {
      setUploadMsg("Please add a title and choose a file.");
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
      if (res.status === 404 || !res.ok) throw new Error("Upload not available");
      const data = await res.json();
      if (Array.isArray(data?.submissions)) setSubmissions(data.submissions);
      else if (data?.submission) setSubmissions((p) => [data.submission, ...p]);
      setUploadTitle("");
      setUploadNote("");
      setUploadFile(null);
      setUploadMsg("✅ Uploaded successfully!");
    } catch (err) {
      setUploadMsg(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const progressSummary = progressReport?.summary;
  const isStream = activeTab === "stream";
  const isClasses = activeTab === "classes";
  const isProgress = activeTab === "progress";
  const isWork = activeTab === "work";

  return (
    <div className="lms-student">
      <header className="lms-student-hero">
        <p className="lms-student-kicker">Lumino LMS · Student</p>
        <h1 className="lms-student-title">
          Hi, <span className="lms-student-name">{fullName}</span>
        </h1>
        <p className="lms-student-sub">
          Your classes, assignments, and work in one place.
        </p>
      </header>

      <div className="lms-student-shell">
        <aside className="lms-student-sidebar">
          <p className="lms-student-nav-title">My classes</p>
          <nav className="lms-student-nav">
            <button
              type="button"
              className={`lms-student-nav-item ${isStream ? "is-active" : ""}`}
              onClick={() => setActiveTab("stream")}
            >
              Stream
            </button>
            <button
              type="button"
              className={`lms-student-nav-item ${isClasses ? "is-active" : ""}`}
              onClick={() => setActiveTab("classes")}
            >
              Class links
            </button>
            <button
              type="button"
              className={`lms-student-nav-item ${isProgress ? "is-active" : ""}`}
              onClick={() => setActiveTab("progress")}
            >
              Progress
            </button>
            <button
              type="button"
              className={`lms-student-nav-item ${isWork ? "is-active" : ""}`}
              onClick={() => setActiveTab("work")}
            >
              Upload work
            </button>
          </nav>
          <hr className="lms-student-divider" />
          <button
            type="button"
            className="lms-student-nav-item lms-student-nav-secondary"
            onClick={() => navigate("/account")}
          >
            Account →
          </button>
        </aside>

        <main className="lms-student-main">
          {activeTab === "stream" && (
            <section className="lms-student-content">
              <h2 className="lms-student-section-title">Stream</h2>
              <div className="lms-student-stream">
                <article className="lms-student-post">
                  <div className="lms-student-post-header">
                    <span className="lms-student-post-icon">📢</span>
                    <div>
                      <strong>Welcome to Lumino</strong>
                      <p className="lms-student-post-meta">From your teacher</p>
                    </div>
                  </div>
                  <p className="lms-student-post-body">
                    Use the <strong>Class links</strong> tab to open Google Classroom and join class meetings. Check <strong>Upload work</strong> to submit assignments.
                  </p>
                </article>
                {classCards.length > 0 && (
                  <div className="lms-student-quick-cards">
                    {classCards.map((c) => (
                      <a
                        key={c.id}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`lms-student-quick-card lms-student-card-${c.color}`}
                      >
                        <span className="lms-student-quick-icon">{c.icon}</span>
                        <span className="lms-student-quick-title">{c.title}</span>
                        <span className="lms-student-quick-sub">{c.subtitle}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === "classes" && (
            <section className="lms-student-content">
              <h2 className="lms-student-section-title">Class links</h2>
              {loadingLinks ? (
                <p>Loading…</p>
              ) : linksError ? (
                <p className="lms-student-error">{linksError}</p>
              ) : classCards.length > 0 ? (
                <div className="lms-student-class-grid">
                  {classCards.map((c) => (
                    <a
                      key={c.id}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`lms-student-class-card lms-student-card-${c.color}`}
                    >
                      <span className="lms-student-class-icon">{c.icon}</span>
                      <h3 className="lms-student-class-title">{c.title}</h3>
                      <p className="lms-student-class-sub">{c.subtitle}</p>
                      <span className="lms-student-class-cta">Open ↗</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p>No class links yet. Your teacher will add them soon.</p>
              )}
            </section>
          )}

          {activeTab === "progress" && (
            <section className="lms-student-content">
              <h2 className="lms-student-section-title">Progress</h2>
              {loadingProgress ? (
                <p>Loading progress…</p>
              ) : progressError ? (
                <p className="lms-student-error">{progressError}</p>
              ) : progressReport || progressSummary ? (
                <>
                  <div className="lms-student-progress-grid">
                    <div className="lms-student-progress-card">
                      <span className="lms-student-progress-label">Score</span>
                      <span className="lms-student-progress-value">
                        {progressSummary?.score ?? progressSummary?.gpa ?? progressReport?.courses?.[0]?.grade ?? "—"}
                      </span>
                    </div>
                    <div className="lms-student-progress-card">
                      <span className="lms-student-progress-label">Completion</span>
                      <span className="lms-student-progress-value">
                        {typeof progressSummary?.completionPct !== "undefined"
                          ? progressSummary.completionPct
                          : progressReport?.courses?.[0]?.progressPct != null
                          ? `${progressReport.courses[0].progressPct}%`
                          : "—"}
                      </span>
                    </div>
                    <div className="lms-student-progress-card">
                      <span className="lms-student-progress-label">Achievement</span>
                      <span className="lms-student-progress-value">
                        {progressSummary?.overallStatus ?? "—"}
                      </span>
                    </div>
                    <div className="lms-student-progress-card">
                      <span className="lms-student-progress-label">Attendance</span>
                      <span className="lms-student-progress-value">
                        {progressSummary?.attendancePct ?? "—"}
                      </span>
                    </div>
                  </div>
                  {Array.isArray(progressReport?.courses) && progressReport.courses.length > 0 && (
                    <div className="lms-student-progress-courses">
                      <h3 className="lms-student-sub-heading">Course details</h3>
                      <ul className="lms-student-course-list">
                        {progressReport.courses.map((p, i) => (
                          <li key={p.classId || i} className="lms-student-course-item">
                            <strong>{p.className || "Class"}</strong>
                            <span>
                              {typeof p.progressPct === "number" ? `${p.progressPct}%` : "—"} complete
                            </span>
                            {p.teacherNote && <p className="lms-student-teacher-note">{p.teacherNote}</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p>Complete your first lesson to see progress here.</p>
              )}
            </section>
          )}

          {activeTab === "work" && (
            <section className="lms-student-content">
              <h2 className="lms-student-section-title">Upload work</h2>
              <form onSubmit={handleUpload} className="lms-student-upload-form">
                <label>
                  Title
                  <input
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="e.g., Math homework"
                  />
                </label>
                <label>
                  Note
                  <textarea
                    value={uploadNote}
                    onChange={(e) => setUploadNote(e.target.value)}
                    placeholder="Optional note"
                    rows={3}
                  />
                </label>
                <label>
                  File
                  <input
                    type="file"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  />
                </label>
                <button type="submit" disabled={uploading}>
                  {uploading ? "Uploading…" : "Submit"}
                </button>
                {uploadMsg && <p className="lms-student-upload-msg">{uploadMsg}</p>}
              </form>
              <h3 className="lms-student-sub-heading">Previous submissions</h3>
              {loadingSubs ? (
                <p>Loading…</p>
              ) : submissions.length > 0 ? (
                <ul className="lms-student-sub-list">
                  {submissions.map((s, i) => (
                    <li key={s.id || i}>
                      <strong>{s.title || "Untitled"}</strong> — {s.status || "Pending"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No submissions yet.</p>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

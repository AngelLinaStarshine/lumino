// src/pages/TeacherLMS.js
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherLMS.css";
import { AuthContext } from "../auth/AuthContext";

export default function TeacherLMS() {
  const navigate = useNavigate();
  const { user, API_BASE } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [links, setLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEmail, setEditingEmail] = useState("");
  const [gcUrl, setGcUrl] = useState("");
  const [meetUrl, setMeetUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const linkMap = useMemo(() => {
    const m = {};
    (links.links || []).forEach((l) => {
      m[l.student_email] = l;
    });
    return m;
  }, [links]);

  useEffect(() => {
    const run = async () => {
      if (!API_BASE) return;
      setLoading(true);
      setError("");
      try {
        const [studentsRes, linksRes] = await Promise.all([
          fetch(`${API_BASE}/api/teacher/students`, { credentials: "include" }),
          fetch(`${API_BASE}/api/teacher/student-links`, { credentials: "include" }),
        ]);
        if (!studentsRes.ok) throw new Error("Failed to load students");
        if (!linksRes.ok) throw new Error("Failed to load links");
        const studentsData = await studentsRes.json();
        const linksData = await linksRes.json();
        setStudents(studentsData.students || []);
        setLinks(linksData);
      } catch (e) {
        setError(e?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [API_BASE]);

  const handleOpenEdit = (email) => {
    const row = linkMap[email];
    setEditingEmail(email);
    setGcUrl(row?.google_classroom_url || "");
    setMeetUrl(row?.class_meeting_url || "");
    setActiveTab("links");
  };

  const handleSaveLinks = async (e) => {
    e.preventDefault();
    if (!editingEmail) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/teacher/student-links/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          student_email: editingEmail,
          google_classroom_url: gcUrl || null,
          class_meeting_url: meetUrl || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const data = await res.json();
      setLinks((prev) => {
        const without = (prev.links || []).filter((l) => l.student_email !== editingEmail);
        return { links: data.row ? [...without, data.row] : without };
      });
      setEditingEmail("");
      setGcUrl("");
      setMeetUrl("");
    } catch (e) {
      setError(e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const fullName = user?.full_name || "Teacher";
  const isDashboard = activeTab === "dashboard";
  const isStudents = activeTab === "students";
  const isLinks = activeTab === "links";

  return (
    <div className="lms-teacher">
      <header className="lms-teacher-hero">
        <p className="lms-teacher-kicker">Lumino LMS · Teacher</p>
        <h1 className="lms-teacher-title">
          Welcome, <span className="lms-teacher-name">{fullName}</span>
        </h1>
        <p className="lms-teacher-sub">
          Manage students, class links, and assignments in one place.
        </p>
      </header>

      <div className="lms-teacher-shell">
        <aside className="lms-teacher-sidebar">
          <p className="lms-teacher-nav-title">Teacher Space</p>
          <nav className="lms-teacher-nav">
            <button
              type="button"
              className={`lms-teacher-nav-item ${isDashboard ? "is-active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              type="button"
              className={`lms-teacher-nav-item ${isStudents ? "is-active" : ""}`}
              onClick={() => setActiveTab("students")}
            >
              Students
            </button>
            <button
              type="button"
              className={`lms-teacher-nav-item ${isLinks ? "is-active" : ""}`}
              onClick={() => setActiveTab("links")}
            >
              Class links
            </button>
          </nav>
          <hr className="lms-teacher-divider" />
          <button
            type="button"
            className="lms-teacher-nav-item lms-teacher-nav-secondary"
            onClick={() => navigate("/")}
          >
            ← Back to site
          </button>
        </aside>

        <main className="lms-teacher-main">
          {activeTab === "dashboard" && (
            <section className="lms-teacher-card">
              <h2 className="lms-teacher-card-title">Quick stats</h2>
              {loading ? (
                <p>Loading…</p>
              ) : error ? (
                <p className="lms-teacher-error">{error}</p>
              ) : (
                <div className="lms-teacher-stats">
                  <div className="lms-teacher-stat-card">
                    <span className="lms-teacher-stat-value">{students.length}</span>
                    <span className="lms-teacher-stat-label">Students</span>
                  </div>
                  <div className="lms-teacher-stat-card">
                    <span className="lms-teacher-stat-value">
                      {Object.keys(linkMap).length}
                    </span>
                    <span className="lms-teacher-stat-label">Links configured</span>
                  </div>
                </div>
              )}
            </section>
          )}

          {activeTab === "students" && (
            <section className="lms-teacher-card">
              <h2 className="lms-teacher-card-title">Students</h2>
              {loading ? (
                <p>Loading…</p>
              ) : error ? (
                <p className="lms-teacher-error">{error}</p>
              ) : (
                <div className="lms-teacher-table-wrap">
                  <table className="lms-teacher-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Links</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => {
                        const row = linkMap[s.email];
                        const hasLinks = !!(row?.google_classroom_url || row?.class_meeting_url);
                        return (
                          <tr key={s.id}>
                            <td>{s.full_name || "…"}</td>
                            <td>{s.email}</td>
                            <td>{hasLinks ? "✓" : "…"}</td>
                            <td>
                              <button
                                type="button"
                                className="lms-teacher-btn-sm"
                                onClick={() => handleOpenEdit(s.email)}
                              >
                                Edit links
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {activeTab === "links" && (
            <section className="lms-teacher-card">
              <h2 className="lms-teacher-card-title">Class links by student</h2>
              {loading ? (
                <p>Loading…</p>
              ) : (
                <>
                  {editingEmail ? (
                    <form onSubmit={handleSaveLinks} className="lms-teacher-form">
                      <p className="lms-teacher-form-email">Editing: {editingEmail}</p>
                      <label>
                        Google Classroom URL
                        <input
                          type="url"
                          value={gcUrl}
                          onChange={(e) => setGcUrl(e.target.value)}
                          placeholder="https://classroom.google.com/…"
                        />
                      </label>
                      <label>
                        Class meeting URL
                        <input
                          type="url"
                          value={meetUrl}
                          onChange={(e) => setMeetUrl(e.target.value)}
                          placeholder="https://meet.google.com/…"
                        />
                      </label>
                      <div className="lms-teacher-form-actions">
                        <button type="submit" disabled={saving}>
                          {saving ? "Saving…" : "Save"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingEmail("");
                            setGcUrl("");
                            setMeetUrl("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="lms-teacher-table-wrap">
                      <table className="lms-teacher-table">
                        <thead>
                          <tr>
                            <th>Student</th>
                            <th>Google Classroom</th>
                            <th>Class meeting</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(links.links || []).map((l) => (
                            <tr key={l.student_email}>
                              <td>{l.student_email}</td>
                              <td>
                                {l.google_classroom_url ? (
                                  <a
                                    href={l.google_classroom_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Open ↗
                                  </a>
                                ) : (
                                  "…"
                                )}
                              </td>
                              <td>
                                {l.class_meeting_url ? (
                                  <a
                                    href={l.class_meeting_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Join ↗
                                  </a>
                                ) : (
                                  "…"
                                )}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="lms-teacher-btn-sm"
                                  onClick={() => handleOpenEdit(l.student_email)}
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="lms-teacher-hint">
                        Add links for a student from the Students tab.
                      </p>
                    </div>
                  )}
                </>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

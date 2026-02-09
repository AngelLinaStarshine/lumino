// src/pages/Programs.js
import React, { useMemo, useState } from "react";
import "./Programs.css";

// 🔗 TODO: replace with your real links
const INTAKE_FORM_URL = "https://forms.gle/your-intake-form-id";
const BOOKING_CALENDAR_URL = "https://calendly.com/lumino-luminolearn/new-meeting-1";

export default function Programs() {
  // =========================
  // Modal state
  // =========================
  const [activeLevel, setActiveLevel] = useState(null);

  const openLevel = (level) => setActiveLevel(level);
  const closeLevel = () => setActiveLevel(null);

  const handleOpenIntakeForm = () => {
    window.open(INTAKE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  const handleBookMeeting = () => {
    window.open(BOOKING_CALENDAR_URL, "_blank", "noopener,noreferrer");
  };

  // ✅ Smooth scroll helper
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // =========================
  // DATA: Levels by Course
  // =========================
  const catalog = useMemo(
    () => ({
      math: {
        badge: "Number Ninjas",
        tagline: "Math Adventures from Counting to Calculus",
        description:
          "Build number sense, logic, and problem-solving through guided practice and fun challenges. Every level ends with a certificate and clear progress feedback.",
        subscription: "12 weeks • 2x per week • Certificate included",
        iep: "3, 6, or 12 months • 2x per week • Customized support",
        badgeClass: "b-math",
        levels: [
          {
            id: "problem-solvers",
            title: "Problem Solvers (9–11)",
            topics: ["Fractions", "Decimals", "Percentages", "Intro to geometry"],
            modal: {
              heading: "Mathematics (Ages 9–11)",
              subtitle: "Fractions, decimals, percentages",
              sampleProject: "“Design Your Dream Room” – apply measurement, area, and scale.",
              description:
                "Students explore fractions, decimals, percentages, and geometry. The program builds strong problem-solving and reasoning skills, preparing them for advanced math concepts.",
              achievement: "Achievement: Junior Mathematician",
            },
          },
          {
            id: "analytical-thinkers",
            title: "Analytical Thinkers (12–14)",
            topics: ["Algebra", "Equations", "Probability", "Graphing functions"],
            modal: {
              heading: "Mathematics (Ages 12–14)",
              subtitle: "Algebra, geometry, probability",
              sampleProject: "“Probability Game Lab” – create a board game using probability rules.",
              description:
                "Students dive into algebra, geometry, and data analysis. The program strengthens logical reasoning, problem-solving, and prepares learners for higher-level math.",
              achievement: "Achievement: Future Analyst Certificate",
            },
          },
          {
            id: "innovators",
            title: "Innovators (15–18)",
            topics: ["Pre-calculus", "Trigonometry", "Analytical problem solving", "Intro statistics"],
            modal: {
              heading: "Mathematics (Ages 15–18)",
              subtitle: "Trigonometry, pre-calculus, applied problem solving",
              sampleProject: "“STEM Data Challenge” – analyze real-world data (sports, climate).",
              description:
                "Students master advanced algebra, geometry, trigonometry, and introductory calculus. The program builds analytical thinking, problem-solving, and readiness for college-level math and real-world applications.",
              achievement: "Achievement: Future Analyst Certificate",
            },
          },
        ],
      },

      language: {
        badge: "Word Wizards",
        tagline: "Creative Expression, Language & Humanities",
        description:
          "Grow reading confidence, vocabulary, and writing skills with engaging stories and creative tasks. Students build fluency and expression step by step.",
        subscription: "12 weeks • 2x per week • Showcase + certificate",
        iep: "3, 6, or 12 months • 2x per week • Reading-level based",
        badgeClass: "b-lang",
        levels: [
          {
            id: "writers-workshop",
            title: "Writer’s Workshop (9–11)",
            topics: ["Paragraph writing", "Comprehension", "Creative writing"],
            modal: {
              heading: "Language & Art (Ages 9–11)",
              subtitle: "Paragraph structure, comprehension, strong voice",
              sampleProject:
                "“Mini Magazine” – write a short article + create an illustrated cover page.",
              description:
                "Students strengthen comprehension and writing structure while learning how to communicate ideas clearly, creatively, and confidently.",
              achievement: "Achievement: Young Author Certificate",
            },
          },
          {
            id: "critical-creators",
            title: "Critical Creators (12–14)",
            topics: ["Essays", "Grammar refinement", "Literary analysis"],
            modal: {
              heading: "Language & Humanities (Ages 12–14)",
              subtitle: "Analysis, academic writing, stronger style",
              sampleProject:
                "“Theme Tracker” – analyze a short text and write a 3-paragraph response.",
              description:
                "Learners refine grammar, expand academic vocabulary, and practice essay thinking—building both creativity and critical reasoning.",
              achievement: "Achievement: Skilled Communicator Certificate",
            },
          },
          {
            id: "academic-mastery",
            title: "Academic Mastery (15–18)",
            topics: ["Argument writing", "Research basics", "Presentation skills"],
            modal: {
              heading: "Language & Humanities (Ages 15–18)",
              subtitle: "Argumentation, research, confident communication",
              sampleProject:
                "“Position Paper + Presentation” – write an argument and present it with visuals.",
              description:
                "Teens strengthen academic writing, argument, and communication skills that support high school success and future study—while keeping a creative edge.",
              achievement: "Achievement: Academic Excellence Certificate",
            },
          },
        ],
      },

      cs: {
        badge: "Code Explorers",
        tagline: "Computer Science & Digital Innovation",
        description:
          "From beginner coding to real projects, students gain digital confidence and future-ready skills. Older learners can progress into AI, cybersecurity, and project portfolios.",
        subscription: "12 weeks • 2x per week • Project-based certificate",
        iep: "3, 6, or 12 months • 2x per week • Tailored CS focus",
        badgeClass: "b-cs",
        levels: [
          {
            id: "project-coders",
            title: "Project Coders (9–11)",
            topics: ["Intro JavaScript", "Mini apps", "Debugging habits"],
            modal: {
              heading: "Computer Science (Ages 9–11)",
              subtitle: "Beginner JavaScript + project thinking",
              sampleProject: "“Mini Game” – design a simple interactive game with rules and scoring.",
              description:
                "Learners move into real coding foundations: writing small programs, debugging, and creating projects they can proudly share.",
              achievement: "Achievement: Project Builder Certificate",
            },
          },
          {
            id: "future-makers",
            title: "Future Makers (12–14)",
            topics: ["Web basics", "APIs (intro)", "Cyber safety fundamentals"],
            modal: {
              heading: "Computer Science (Ages 12–14)",
              subtitle: "Web building + digital literacy + safer computing",
              sampleProject:
                "“Portfolio Page” – build a personal page with sections and interactive elements.",
              description:
                "Students strengthen coding fluency and learn responsible tech use—while building projects that show real skill growth.",
              achievement: "Achievement: Emerging Developer Certificate",
            },
          },
          {
            id: "innovation-track",
            title: "Innovation Track (15–18)",
            topics: ["Full projects", "AI (intro)", "Cybersecurity (intro)"],
            modal: {
              heading: "Computer Science (Ages 15–18)",
              subtitle: "Projects, AI foundations, cybersecurity intro",
              sampleProject: "“Capstone Project” – build a portfolio-ready project and present it.",
              description:
                "Teens progress into advanced project work with optional pathways into AI and cybersecurity, building a portfolio that supports internships, competitions, or future study.",
              achievement: "Achievement: Innovation Certificate + Portfolio Badge",
            },
          },
        ],
      },
    }),
    []
  );

  // =========================
  // Dropdown per course
  // =========================
  const [selected, setSelected] = useState({
    math: "",
    language: "",
    cs: "",
  });

  const handleSelect = (courseKey, levelId) => {
    setSelected((prev) => ({ ...prev, [courseKey]: levelId }));
    if (!levelId) return;

    const lvl = catalog[courseKey].levels.find((l) => l.id === levelId);
    if (!lvl) return;

    openLevel({
      ...lvl,
      courseKey,
      courseName: catalog[courseKey].badge,
      badgeClass: catalog[courseKey].badgeClass,
    });
  };

  const LevelDropdown = ({ courseKey }) => (
    <div className="levels-dropdown">
      <label className="levels-label" htmlFor={`${courseKey}-levels`}>
        Choose an age group
      </label>

      <select
        id={`${courseKey}-levels`}
        className="levels-select"
        value={selected[courseKey]}
        onChange={(e) => handleSelect(courseKey, e.target.value)}
      >
        <option value="">Select…</option>
        {catalog[courseKey].levels.map((lvl) => (
          <option key={lvl.id} value={lvl.id}>
            {lvl.title}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <main className="programs-page" id="programs-top">
      {/* =========================
          BAND 1 (Premium): Sticky Nav + Hero
         ========================= */}
      <section className="programs-band band-premium">
        <div className="programs-inner">
          {/* Sticky Quick Nav (Tuition-style placement: inside band) */}
       

          {/* HERO */}
          <div className="pg-hero">
            <p className="about-kicker">Learning Path</p>

<h1 className="about-title">
  <span className="brand-name brand-highlight">LuminoLearn</span>
  <span className="about-title-rest"> learning paths.</span>
</h1>


            <p className="pg-lead">
              Every child learns differently. LuminoLearn begins with a short discovery phase to understand
              your child’s level, confidence, and pace, followed by a structured learning cycle that supports
              steady growth over time.
            </p>

            <p className="pg-lead">
              Families can begin with <strong>LuminoStart™</strong> (4 weeks) to explore fit and direction,
              then continue with <strong>LuminoCore™</strong> (12 weeks) for guided lessons, meaningful projects,
              and clear progress feedback.
            </p>

            {/* Quick jump buttons inside hero */}
            <div className="pg-hero-cta">
              <button className="pg-btn ghost" type="button" onClick={() => scrollToId("course-math")}>
                Explore Math
              </button>
              <button className="pg-btn ghost" type="button" onClick={() => scrollToId("course-language")}>
                Explore Language
              </button>
              <button className="pg-btn ghost" type="button" onClick={() => scrollToId("course-cs")}>
                Explore CS
              </button>
            </div>

            <div className="pg-badges">
              <span className="pg-pill">Thoughtful placement</span>
              <span className="pg-pill">Structured learning cycles</span>
              <span className="pg-pill">Clear parent updates</span>
              <span className="pg-pill">Project-based learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BAND 2 (White): LuminoStart + LuminoCore
         ========================= */}
      <section className="programs-band band-white">
        <div className="programs-inner">
          <section className="pg-section">
            <div className="lp-grid">
              <article className="lp-card">
                <div className="lp-head">
                  <span className="lp-icon">🧭</span>
                  <h3 className="lp-title">
                    LuminoStart™ <span className="lp-sub">(4 weeks)</span>
                  </h3>
                </div>

                <ul className="lp-list">
                  <li>
                    <strong>Quick assessment</strong> + skill snapshot
                  </li>
                  <li>
                    <strong>Confidence-first foundation</strong> (no overwhelm)
                  </li>
                  <li>
                    <strong>Best-fit placement</strong> (level + pacing)
                  </li>
                </ul>

                <div className="lp-footer">
                  <span className="lp-chip">Perfect starting point</span>
                  <span className="lp-chip">Fast & focused</span>
                </div>
              </article>

              <article className="lp-card core">
                <div className="lp-head">
                  <span className="lp-icon">🏁</span>
                  <h3 className="lp-title">
                    LuminoCore™ <span className="lp-sub">(12 weeks)</span>
                  </h3>
                </div>

                <ul className="lp-list">
                  <li>
                    <strong>2 lessons/week</strong> + guided practice
                  </li>
                  <li>
                    <strong>Projects</strong> + teacher feedback
                  </li>
                  <li>
                    <strong>Certificate</strong> + parent progress report
                  </li>
                </ul>

                <div className="lp-footer">
                  <span className="lp-chip">Mastery cycle</span>
                  <span className="lp-chip">Visible progress</span>
                </div>
              </article>
            </div>

            <p className="lp-note" id="directions">
              Choose your direction below. Enroll in <strong>one</strong>, <strong>two</strong>, or{" "}
              <strong>all three</strong> we’ll help you balance the load.
            </p>
          </section>
        </div>
      </section>

      {/* =========================
          BAND 3 (Tiffany): Courses Grid
         ========================= */}
      <section className="programs-band band-tiffany">
        <div className="programs-inner">
          <section className="pg-section">
            <div className="courses-container three-column">
              {/* ========================= MATH ========================= */}
              <article className="course-card" id="course-math">
                <div className="course-top">
                  <span className={`course-badge ${catalog.math.badgeClass}`}>{catalog.math.badge}</span>
                  <p className="course-tagline">{catalog.math.tagline}</p>
                </div>

                <p className="course-description">{catalog.math.description}</p>

                <div className="course-subscriptions">
                  <div className="subscription-pill">
                    <h4>Course Subscription</h4>
                    <p>{catalog.math.subscription}</p>
                  </div>
                  <div className="subscription-pill alt">
                    <h4>Personal Learning Plan (IEP)</h4>
                    <p>{catalog.math.iep}</p>
                  </div>
                </div>

                <div className="course-actions">
                  <button className="enroll" type="button" onClick={handleBookMeeting}>
                    Book a Free Meeting
                  </button>
                </div>

                <LevelDropdown courseKey="math" />
              </article>

              {/* ========================= LANGUAGE ========================= */}
              <article className="course-card" id="course-language">
                <div className="course-top">
                  <span className={`course-badge ${catalog.language.badgeClass}`}>
                    {catalog.language.badge}
                  </span>
                  <p className="course-tagline">{catalog.language.tagline}</p>
                </div>

                <p className="course-description">{catalog.language.description}</p>

                <div className="course-subscriptions">
                  <div className="subscription-pill">
                    <h4>Course Subscription</h4>
                    <p>{catalog.language.subscription}</p>
                  </div>
                  <div className="subscription-pill alt">
                    <h4>Personal Learning Plan (IEP)</h4>
                    <p>{catalog.language.iep}</p>
                  </div>
                </div>

                <div className="course-actions">
                  <button className="enroll" type="button" onClick={handleBookMeeting}>
                    Book a Free Meeting
                  </button>
                </div>

                <LevelDropdown courseKey="language" />
              </article>

              {/* ========================= CS ========================= */}
              <article className="course-card" id="course-cs">
                <div className="course-top">
                  <span className={`course-badge ${catalog.cs.badgeClass}`}>{catalog.cs.badge}</span>
                  <p className="course-tagline">{catalog.cs.tagline}</p>
                </div>

                <p className="course-description">{catalog.cs.description}</p>

                <div className="course-subscriptions">
                  <div className="subscription-pill">
                    <h4>Course Subscription</h4>
                    <p>{catalog.cs.subscription}</p>
                  </div>
                  <div className="subscription-pill alt">
                    <h4>Personal Learning Plan (IEP)</h4>
                    <p>{catalog.cs.iep}</p>
                  </div>
                </div>

                <div className="course-actions">
                  <button className="enroll" type="button" onClick={handleBookMeeting}>
                    Book a Free Meeting
                  </button>
                </div>

                <LevelDropdown courseKey="cs" />
              </article>
            </div>
          </section>
        </div>
      </section>

      {/* =========================
          MODAL (kept at root; overlay is fixed anyway)
         ========================= */}
      {activeLevel && (
        <div className="modal-overlay" onClick={closeLevel} role="presentation">
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button className="modal-close" onClick={closeLevel} aria-label="Close" type="button">
              ×
            </button>

            <div className="modal-badge-row">
              <span className={`course-badge ${activeLevel.badgeClass}`}>{activeLevel.courseName}</span>
              <span className="modal-level-title">{activeLevel.title}</span>
            </div>

            <h2>{activeLevel.modal.heading}</h2>
            <p className="modal-subtitle">{activeLevel.modal.subtitle}</p>

            <div className="modal-topics">
              <p className="modal-topics-title">Focus topics</p>
              <div className="modal-topics-pills">
                {activeLevel.topics.map((t) => (
                  <span key={t} className="modal-topic-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <p className="modal-sample">
              <strong>Sample Project:</strong> {activeLevel.modal.sampleProject}
            </p>

            <p className="modal-description">{activeLevel.modal.description}</p>

            {activeLevel.modal.extra && (
              <p className="modal-extra">
                <strong>Focus:</strong> {activeLevel.modal.extra}
              </p>
            )}

            <p className="modal-achievement">{activeLevel.modal.achievement}</p>

            <div className="modal-actions" style={{ marginTop: "16px" }}>
              <button className="modal-btn primary" onClick={handleOpenIntakeForm} type="button">
                Parent Intake Form
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// src/pages/Programs.js
// Learning Paths — Aligned with LuminoPro: main-hero, main-value-section, main-value-card
import React, { useMemo, useState } from "react";
import "../pages/Main.css";
import "./Programs.css";

// 🔗 TODO: replace with your real links
const INTAKE_FORM_URL = "https://forms.gle/your-intake-form-id";
const BOOKING_CALENDAR_URL = "https://calendly.com/lumino-luminolearn/new-meeting-1";

export default function Programs() {
  // =========================
  // Modal state
  // =========================
  const [activeLevel, setActiveLevel] = useState(null);

  // =========================
  // LuminoStart / LuminoCore expandable cards
  // =========================

  const openLevel = (level) => setActiveLevel(level);
  const closeLevel = () => setActiveLevel(null);

  const handleOpenIntakeForm = (formUrl) => {
    const url = formUrl || INTAKE_FORM_URL;
    window.open(url, "_blank", "noopener,noreferrer");
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
        tagline: "Math Adventures: From Counting to Calculus",
        description:
          "We help students build strong mathematical foundations through logic, structure, and engaging challenges. From early number sense to advanced problem-solving, every step is guided and purposeful.",
        gains: [
          "Strong number sense and analytical thinking",
          "Confidence in solving complex problems",
          "Clear progress tracking and milestone achievements",
        ],
        subscription: "12 weeks • 2 sessions per week • Certificate included",
        iep: "3, 6, or 12 months • Fully customized support",
        badgeClass: "b-math",
        levels: [
          {
            id: "problem-solvers",
            title: "Problem Solvers (9-11)",
            topics: ["Fractions", "Decimals", "Percentages", "Intro to geometry"],
            formUrl: "https://forms.gle/txh4xWL3PuJpJpTr6",
            modal: {
              heading: "Mathematics (Ages 9-11)",
              subtitle: "Fractions, decimals, percentages",
              sampleProject: "“Design Your Dream Room\": apply measurement, area, and scale.",
              description:
                "Students explore fractions, decimals, percentages, and geometry. The program builds strong problem-solving and reasoning skills, preparing them for advanced math concepts.",
              achievement: "Achievement: Junior Mathematician",
            },
          },
          {
            id: "analytical-thinkers",
            title: "Analytical Thinkers (12-14)",
            topics: ["Algebra", "Equations", "Probability", "Graphing functions"],
            modal: {
              heading: "Mathematics (Ages 12-14)",
              subtitle: "Algebra, geometry, probability",
              sampleProject: "“Probability Game Lab\": create a board game using probability rules.",
              description:
                "Students dive into algebra, geometry, and data analysis. The program strengthens logical reasoning, problem-solving, and prepares learners for higher-level math.",
              achievement: "Achievement: Future Analyst Certificate",
            },
          },
          {
            id: "innovators",
            title: "Innovators (15-18)",
            topics: ["Pre-calculus", "Trigonometry", "Analytical problem solving", "Intro statistics"],
            modal: {
              heading: "Mathematics (Ages 15-18)",
              subtitle: "Trigonometry, pre-calculus, applied problem solving",
              sampleProject: "“STEM Data Challenge\": analyze real-world data (sports, climate).",
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
          "We nurture confident readers, expressive writers, and thoughtful communicators. Through storytelling, structured writing, and discussion, students develop both skill and voice.",
        gains: [
          "Reading fluency and comprehension",
          "Strong vocabulary and writing structure",
          "Confidence in communication and expression",
        ],
        subscription: "12 weeks • 2 sessions per week • Showcase + Certificate",
        iep: "3, 6, or 12 months • Reading-level based",
        badgeClass: "b-lang",
        levels: [
          {
            id: "writers-workshop",
            title: "Writer’s Workshop (9-11)",
            topics: ["Paragraph writing", "Comprehension", "Creative writing"],
            formUrl: "https://forms.gle/TVbemtprDtK9Zixw9",
            modal: {
              heading: "Language & Art (Ages 9-11)",
              subtitle: "Paragraph structure, comprehension, strong voice",
              sampleProject:
                "“Mini Magazine\": write a short article + create an illustrated cover page.",
              description:
                "Students strengthen comprehension and writing structure while learning how to communicate ideas clearly, creatively, and confidently.",
              achievement: "Achievement: Young Author Certificate",
            },
          },
          {
            id: "critical-creators",
            title: "Critical Creators (12-14)",
            topics: ["Essays", "Grammar refinement", "Literary analysis"],
            modal: {
              heading: "Language & Humanities (Ages 12-14)",
              subtitle: "Analysis, academic writing, stronger style",
              sampleProject:
                "“Theme Tracker\": analyze a short text and write a 3-paragraph response.",
              description:
                "Learners refine grammar, expand academic vocabulary, and practice essay thinking, building both creativity and critical reasoning.",
              achievement: "Achievement: Skilled Communicator Certificate",
            },
          },
          {
            id: "academic-mastery",
            title: "Academic Mastery (15-18)",
            topics: ["Argument writing", "Research basics", "Presentation skills"],
            modal: {
              heading: "Language & Humanities (Ages 15-18)",
              subtitle: "Argumentation, research, confident communication",
              sampleProject:
                "“Position Paper + Presentation\": write an argument and present it with visuals.",
              description:
                "Teens strengthen academic writing, argument, and communication skills that support high school success and future study, while keeping a creative edge.",
              achievement: "Achievement: Academic Excellence Certificate",
            },
          },
        ],
      },

      cs: {
        badge: "Code Explorers",
        tagline: "Computer Science & Digital Innovation",
        description:
          "From first lines of code to real-world projects, students develop digital fluency and future-ready skills. Advanced learners explore AI, cybersecurity, and portfolio-building.",
        gains: [
          "Coding fundamentals and logical thinking",
          "Project-based learning experience",
          "Exposure to advanced tech pathways",
        ],
        subscription: "12 weeks • 2 sessions per week • Project-based certificate",
        iep: "3, 6, or 12 months • Tailored CS pathway",
        badgeClass: "b-cs",
        levels: [
          {
            id: "project-coders",
            title: "Project Coders (9-11)",
            topics: ["Intro JavaScript", "Mini apps", "Debugging habits"],
            formUrl: "https://forms.gle/AdkicVongWKAfSdt5",
            modal: {
              heading: "Computer Science (Ages 9-11)",
              subtitle: "Beginner JavaScript + project thinking",
              sampleProject: "“Mini Game\": design a simple interactive game with rules and scoring.",
              description:
                "Learners move into real coding foundations: writing small programs, debugging, and creating projects they can proudly share.",
              achievement: "Achievement: Project Builder Certificate",
            },
          },
          {
            id: "future-makers",
            title: "Future Makers (12-14)",
            topics: ["Web basics", "APIs (intro)", "Cyber safety fundamentals"],
            modal: {
              heading: "Computer Science (Ages 12-14)",
              subtitle: "Web building + digital literacy + safer computing",
              sampleProject:
                "“Portfolio Page\": build a personal page with sections and interactive elements.",
              description:
                "Students strengthen coding fluency and learn responsible tech use, while building projects that show real skill growth.",
              achievement: "Achievement: Emerging Developer Certificate",
            },
          },
          {
            id: "innovation-track",
            title: "Innovation Track (15-18)",
            topics: ["Full projects", "AI (intro)", "Cybersecurity (intro)"],
            modal: {
              heading: "Computer Science (Ages 15-18)",
              subtitle: "Projects, AI foundations, cybersecurity intro",
              sampleProject: "“Capstone Project\": build a portfolio-ready project and present it.",
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
    <div className="App main-page programs-page" id="programs-top">
      {/* Hero — LuminoPro-style */}
      <section className="main-hero programs-hero">
        <div className="main-hero-inner">
          <span className="main-hero-badge">Learning Paths</span>
          <h1>
            <span className="main-hero-brand">LuminoLearn</span>
            {" "}
            Learning Paths
          </h1>
          <p className="main-hero-lead programs-hero-sub">
            Where every child's journey begins with understanding.
          </p>
          <p className="main-hero-lead">
            Every child learns differently, and at LuminoLearn, we honor that. We begin with a short discovery phase to understand
              your child’s current level, confidence, and learning pace. From there, we design a structured and supportive learning path that builds not only academic skills, but also confidence, curiosity, and independence.
            </p>

          <p className="main-hero-lead">
            Families can start with <strong>LuminoStart™</strong> (4 weeks) to explore fit and direction, and continue with <strong>LuminoCore™</strong> (12 weeks) for deeper learning, guided practice, and measurable progress.
            </p>

          <p className="main-hero-actions-label">🎯 Explore Learning Paths</p>
          <p className="main-hero-lead-small">Choose the direction that aligns with your child's strengths and goals:</p>
          <div className="main-hero-actions">
            <button className="main-hero-btn secondary" type="button" onClick={() => scrollToId("course-math")}>
              Explore Math
            </button>
            <button className="main-hero-btn secondary" type="button" onClick={() => scrollToId("course-language")}>
              Explore Language
            </button>
            <button className="main-hero-btn secondary" type="button" onClick={() => scrollToId("course-cs")}>
              Explore Computer Science
            </button>
          </div>
        </div>
      </section>

      {/* How It Works — 3 steps */}
      <section className="main-value-section programs-path-section" id="how-it-works" aria-labelledby="path-heading">
        <div className="main-value-inner">
          <h2 id="path-heading" className="main-value-title">🔍 How It Works</h2>
          <p className="main-value-sub">A clear path from discovery to growth</p>
          <div className="programs-how-grid">
            <article className="programs-how-step main-value-card">
              <div className="main-value-card-icon">1</div>
              <h3>Discover</h3>
              <p className="main-value-card-desc">
                We assess your child's level, strengths, and learning style.
              </p>
            </article>
            <article className="programs-how-step main-value-card">
              <div className="main-value-card-icon">2</div>
              <h3>Personalize</h3>
              <p className="main-value-card-desc">
                We design a learning path tailored to their pace and goals.
              </p>
            </article>
            <article className="programs-how-step main-value-card">
              <div className="main-value-card-icon">3</div>
              <h3>Build & Grow</h3>
              <p className="main-value-card-desc">
                Through guided sessions, projects, and feedback, your child develops skills with confidence.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="main-value-section programs-courses-section" id="courses" aria-labelledby="courses-heading">
        <div className="main-value-inner">
          <h2 id="courses-heading" className="main-value-title">🎓 Our Programs</h2>
          <p className="main-value-sub">Choose the direction that aligns with your child's strengths and goals</p>
          <div className="courses-container three-column">
              {/* ========================= MATH ========================= */}
              <article className="course-card" id="course-math">
                <div className="course-top">
                  <span className={`course-badge ${catalog.math.badgeClass}`}>🧮 {catalog.math.badge}</span>
                  <p className="course-tagline">{catalog.math.tagline}</p>
                </div>

                <p className="course-description">{catalog.math.description}</p>

                <h4 className="course-gains-label">✨ What students gain:</h4>
                <ul className="course-gains-list">
                  {catalog.math.gains.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>

                <h4 className="course-options-label">Options:</h4>
                <div className="course-subscriptions">
                  <div className="subscription-pill">
                    <h4>Structured Course (12 weeks)</h4>
                    <p>{catalog.math.subscription}</p>
                  </div>
                  <div className="subscription-pill alt">
                    <h4>Personal Learning Plan (IEP)</h4>
                    <p>{catalog.math.iep}</p>
                  </div>
                </div>

                <div className="course-actions">
                  <button className="enroll" type="button" onClick={handleBookMeeting}>
                    Complimentary Consultation
                  </button>
                </div>

                <LevelDropdown courseKey="math" />
              </article>

              {/* ========================= LANGUAGE ========================= */}
              <article className="course-card" id="course-language">
                <div className="course-top">
                  <span className={`course-badge ${catalog.language.badgeClass}`}>
                    🧙‍♂️ {catalog.language.badge}
                  </span>
                  <p className="course-tagline">{catalog.language.tagline}</p>
                </div>

                <p className="course-description">{catalog.language.description}</p>

                <h4 className="course-gains-label">✨ What students gain:</h4>
                <ul className="course-gains-list">
                  {catalog.language.gains.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>

                <h4 className="course-options-label">Options:</h4>
                <div className="course-subscriptions">
                  <div className="subscription-pill">
                    <h4>Structured Course (12 weeks)</h4>
                    <p>{catalog.language.subscription}</p>
                  </div>
                  <div className="subscription-pill alt">
                    <h4>Personal Learning Plan (IEP)</h4>
                    <p>{catalog.language.iep}</p>
                  </div>
                </div>

                <div className="course-actions">
                  <button className="enroll" type="button" onClick={handleBookMeeting}>
                    Complimentary Consultation
                  </button>
                </div>

                <LevelDropdown courseKey="language" />
              </article>

              {/* ========================= CS ========================= */}
              <article className="course-card" id="course-cs">
                <div className="course-top">
                  <span className={`course-badge ${catalog.cs.badgeClass}`}>💻 {catalog.cs.badge}</span>
                  <p className="course-tagline">{catalog.cs.tagline}</p>
                </div>

                <p className="course-description">{catalog.cs.description}</p>

                <h4 className="course-gains-label">✨ What students gain:</h4>
                <ul className="course-gains-list">
                  {catalog.cs.gains.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>

                <h4 className="course-options-label">Options:</h4>
                <div className="course-subscriptions">
                  <div className="subscription-pill">
                    <h4>Structured Course (12 weeks)</h4>
                    <p>{catalog.cs.subscription}</p>
                  </div>
                  <div className="subscription-pill alt">
                    <h4>Personal Learning Plan (IEP)</h4>
                    <p>{catalog.cs.iep}</p>
                  </div>
                </div>

                <div className="course-actions">
                  <button className="enroll" type="button" onClick={handleBookMeeting}>
                    Complimentary Consultation
                  </button>
                </div>

                <LevelDropdown courseKey="cs" />
              </article>
            </div>
        </div>
      </section>

      {/* Ready to Begin — full-width, aligned with How It Works & Our Programs */}
      <section className="programs-cta-section programs-cta-full main-value-section" id="get-started" aria-labelledby="programs-cta-heading">
        <div className="main-value-inner programs-cta-full-inner">
          <h2 id="programs-cta-heading" className="programs-cta-hero-title">🚀 Ready to Begin?</h2>
          <p className="programs-cta-lead">
            Your child's learning journey starts with <strong>understanding</strong>, not assumptions.
          </p>

          <div className="programs-philosophy programs-philosophy-full">
            <h3 className="programs-philosophy-title">💡 Our Philosophy</h3>
            <p className="programs-philosophy-text">
              At LuminoLearn, we don't just teach subjects, we build <span className="philosophy-highlight">thinkers</span>, <span className="philosophy-highlight">creators</span>, and <span className="philosophy-highlight">confident learners</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeLevel && (
        <div className="modal-overlay" onClick={closeLevel} role="presentation">
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-header">
              <div className="modal-header-top">
                <div className="modal-badges">
                  <span className={`course-badge ${activeLevel.badgeClass}`}>{activeLevel.courseName}</span>
                  <span className="modal-level-name">{activeLevel.title}</span>
                </div>
                <button className="modal-close" onClick={closeLevel} aria-label="Close" type="button">
                  ×
                </button>
              </div>
              <h2 id="modal-title" className="modal-title">{activeLevel.modal.heading}</h2>
              <p className="modal-subtitle">{activeLevel.modal.subtitle}</p>
            </div>

            <div className="modal-body">
              <section className="modal-section modal-topics">
                <h3 className="modal-section-label">Focus topics</h3>
                <div className="modal-topics-pills">
                  {activeLevel.topics.map((t) => (
                    <span key={t} className="modal-topic-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </section>

              <section className="modal-section modal-sample-block">
                <h3 className="modal-section-label">Sample project</h3>
                <p className="modal-sample-text">{activeLevel.modal.sampleProject}</p>
              </section>

              <p className="modal-description">{activeLevel.modal.description}</p>

              {activeLevel.modal.extra && (
                <section className="modal-section modal-extra">
                  <h3 className="modal-section-label">Focus</h3>
                  <p>{activeLevel.modal.extra}</p>
                </section>
              )}

              <div className="modal-achievement">
                <span className="modal-achievement-icon">🏆</span>
                <span>{activeLevel.modal.achievement}</span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn primary" onClick={() => handleOpenIntakeForm(activeLevel.formUrl)} type="button">
                {activeLevel.formUrl ? "Complete Registration Form" : "Parent Intake Form"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

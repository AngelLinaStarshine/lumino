// src/pages/LuminoPro.js
import React from "react";

const LUMINOPRO_EMAIL = "mailto:lumino@luminolearn.org?subject=LuminoPro%20inquiry";
const LUMINOPRO_CALENDAR_URL =
  "https://calendly.com/lumino-luminolearn/new-meeting-1";

export default function LuminoPro() {
  const openEmail = () => {
    window.location.href = LUMINOPRO_EMAIL;
  };

  const openCalendar = () => {
    window.open(LUMINOPRO_CALENDAR_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="simple-page">
      <main className="simple-page-inner" id="luminopro-top">
        <p className="about-kicker">LuminoPro</p>

        <h1 className="about-title">
          <span className="brand-name brand-highlight">LuminoPro</span>
          <span className="about-title-rest">
            {" "}
            for schools, teachers &amp; adults.
          </span>
        </h1>

        <p className="lead">
          LuminoPro is the professional branch of LuminoLearn. It supports{" "}
          <strong>teachers, instructional leaders, and adult learners</strong>{" "}
          with clear, well-structured learning experiences&mdash;designed to
          feel calm, practical, and immediately useful in real classrooms and
          workplaces.
        </p>

        {/* Who LuminoPro is for */}
        <section style={{ marginTop: "2rem" }}>
          <h2>Who LuminoPro serves</h2>
          <div className="grid-2">
            <article className="card">
              <h2>School &amp; district leaders</h2>
              <p>
                For principals, PD directors, and coordinators who want{" "}
                <strong>coherent professional learning</strong> instead of
                one-off workshops.
              </p>
              <ul>
                <li>Aligned PD series in math, literacy, and CS/STEM</li>
                <li>Implementation coaching for new initiatives</li>
                <li>Practical tools teachers can use the next day</li>
              </ul>
            </article>

            <article className="card">
              <h2>Teachers &amp; instructional teams</h2>
              <p>
                For educators who want to deepen practice in a{" "}
                <strong>supportive, non-judgmental space</strong>.
              </p>
              <ul>
                <li>High-impact routines for math and literacy</li>
                <li>Blending AI and digital tools safely in class</li>
                <li>Planning labs with ready-to-adapt lesson ideas</li>
              </ul>
            </article>
          </div>

          <article className="card">
            <h2>Parents &amp; adult learners</h2>
            <p>
              For caregivers and professionals who want{" "}
              <strong>clear, focused upskilling</strong> without noise.
            </p>
            <ul>
              <li>Short courses in digital skills and AI literacy</li>
              <li>Coaching on supporting children&apos;s learning at home</li>
              <li>Flexible formats that fit busy schedules</li>
            </ul>
          </article>
        </section>

        {/* How LuminoPro works */}
        <section style={{ marginTop: "2.5rem" }}>
          <h2>How LuminoPro works</h2>
          <div className="grid-3">
            <article className="card">
              <h2>1. Discovery &amp; needs scan</h2>
              <p>
                We listen first&mdash;to your context, priorities, and existing
                initiatives&mdash;before suggesting any pathway.
              </p>
            </article>

            <article className="card">
              <h2>2. Program or PD design</h2>
              <p>
                We co-design a focused series of sessions or learning journeys
                with <strong>clear outcomes</strong> and practical artifacts.
              </p>
            </article>

            <article className="card">
              <h2>3. Ongoing support &amp; reflection</h2>
              <p>
                Optional coaching, office hours, and reflection spaces help
                teams translate ideas into everyday practice.
              </p>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: "2.5rem" }}>
          <p className="lead">
            Share a bit about your school or context, and we&apos;ll respond
            with a{" "}
            <strong>short, concrete proposal for a LuminoPro partnership</strong>
            &mdash;no pressure and no jargon.
          </p>

          <div className="home-cta-row">
            <button className="home-cta primary" type="button" onClick={openCalendar}>
              Book a short call
            </button>
            <button className="home-cta secondary" type="button" onClick={openEmail}>
              Email the LuminoPro team
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}


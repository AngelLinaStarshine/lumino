import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import contactImg from '../assets/contact.png';
import HomeImage from '../assets/Home.svg';
import studyImg from '../assets/study.jpg';
import homeworkImg from '../assets/homework.jpg';
import monthlyImg from '../assets/monthly.jpg';
import arrowImg from '../assets/arrowImg.svg';
import visionImg from '../assets/vision.png';
import missionImg from '../assets/mission.png';
import valuesImg from '../assets/values.png';
import '../pages/Main.css';

const valueProps = [
  { icon: '🏠', title: 'Class home base', desc: 'See what we\'re working on this week and what\'s coming next.', tip: 'Parents stay in the loop without extra emails.' },
  { icon: '📚', title: 'Lesson slides & replays', desc: 'Key moments and notes your child can revisit anytime.', tip: 'Reinforce learning at your child\'s own pace.' },
  { icon: '💡', title: 'Shared space for ideas', desc: 'A calm corner for questions, reflections, and "aha" moments.', tip: 'Build confidence through safe, guided discussion.' },
  { icon: '📋', title: 'Assignments at a glance', desc: 'Due dates laid out clearly, nothing feels like a surprise.', tip: 'Reduce stress with clear expectations.' },
  { icon: '✨', title: 'Gentle review before tests', desc: 'Light-touch practice so your child feels ready, not rushed.', tip: 'Test prep that builds confidence, not anxiety.' },
  { icon: '🏆', title: 'Projects we\'re proud of', desc: 'A gallery of small wins and projects that celebrate progress.', tip: 'Visible growth keeps motivation high.' },
];

const colors = ['#d9b8f3', '#7dcfb6', '#ffde59', '#f97316', '#7dcfb6', '#d9b8f3'];
const headings = valueProps.map((v) => v.title);

const descriptions = [
  'A simple place to see what we are working on this week and what is coming next.',
  'Key lesson moments, slides, and notes your child can revisit in their own time.',
  'A calm corner for questions, reflections, and little “aha” moments to be shared.',
  'Assignments and due dates laid out clearly so nothing feels like a surprise.',
  'Light-touch practice and review so your child feels ready, not rushed.',
  'A gallery of small wins and projects that celebrate real progress.'
];

function Main() {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <div className="App main-page">
      <section className="main-hero">
        <div className="main-hero-inner">
          <span className="main-hero-badge">Small groups · Real teachers</span>
          <h1>
            Where curious kids build <span className="main-hero-brand">skills, confidence, and calm</span>
          </h1>
          <p className="main-hero-lead">
            LuminoLearn is a warm, human-first learning space. Real connection. Screen-light.
            Math, English, and Computer Science, with clarity and care.
          </p>
          <div className="main-hero-actions">
            <button className="main-hero-btn primary" onClick={() => navigate('/programs')}>
              Explore Learning Paths
            </button>
          </div>
        </div>
      </section>

      <header className="header">
        <img src={HomeImage} alt="Home" className="header-image" />
        <div className="header-buttons">
          <img src={arrowImg} alt="Next" className="animated-arrow" />
          <button onClick={() => navigate('/login')} className="login_btn signin">
            Sign In
          </button>
          
        </div>
      </header>

      {/* Value props - interactive bento grid */}
      <section className="main-value-section" id="essentials">
        <div className="main-value-inner">
          <h2 className="main-value-title">What you get with Lumino</h2>
          <p className="main-value-sub">Everything in one calm, organized space. Click any card to learn more</p>
          <div className="main-value-grid">
            {valueProps.map((v, i) => (
              <div
                key={i}
                className={`main-value-card ${expandedCard === i ? 'expanded' : ''}`}
                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setExpandedCard(expandedCard === i ? null : i);
                  }
                }}
                aria-expanded={expandedCard === i}
              >
                <div className="main-value-card-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p className="main-value-card-desc">{v.desc}</p>
                {expandedCard === i && (
                  <div className="main-value-card-tip">
                    <span className="main-value-tip-label">Why it matters</span>
                    <p>{v.tip}</p>
                    <button
                      className="main-value-card-cta"
                      onClick={(e) => { e.stopPropagation(); navigate('/programs'); }}
                    >
                      Explore programs →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="main-value-section-cta">
            <button className="main-hero-btn primary" onClick={() => navigate('/programs')}>
              See all learning paths
            </button>
          </div>
        </div>
      </section>

      <div className="section essentials-section main-carousel-wrap">
        <div className="essentials-carousel">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
          >
            {colors.map((color, index) => (
              <SwiperSlide key={index} style={{ backgroundColor: color }}>
                <div className="slide-content">
                  <h3>{headings[index]}</h3>
                  <p>{descriptions[index]}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="skills-wrapper">
        <div className="skills-grid">
          <img src={studyImg} alt="Study" className="skills-image" />
          <img src={homeworkImg} alt="Homework" className="skills-image" />
          <img src={monthlyImg} alt="Monthly" className="skills-image" />
        </div>
      </div>

      <section className="beyond-section beyond-vmv">
        <div className="beyond-vmv-inner">
          <h2 className="beyond-vmv-title">Beyond the classroom</h2>

          <div className="beyond-vmv-canvas">
            <div className="beyond-vmv-block beyond-vmv-left">
              <div className="beyond-vmv-img-wrap">
                <img src={visionImg} alt="" className="beyond-vmv-img" aria-hidden />
              </div>
              <div className="beyond-vmv-content">
                <h3>Vision</h3>
                <p>Every child learns with confidence and clarity, supported by strong skills, real progress, and caring instruction.</p>
              </div>
            </div>
            <div className="beyond-vmv-block beyond-vmv-center">
              <div className="beyond-vmv-img-wrap">
                <img src={missionImg} alt="" className="beyond-vmv-img" aria-hidden />
              </div>
              <div className="beyond-vmv-content">
                <h3>Mission</h3>
                <p>To provide structured, measurable, tech-safe learning paths that make growth visible and keep families informed every step of the way.</p>
              </div>
            </div>
            <div className="beyond-vmv-block beyond-vmv-right">
              <div className="beyond-vmv-img-wrap">
                <img src={valuesImg} alt="" className="beyond-vmv-img" aria-hidden />
              </div>
              <div className="beyond-vmv-content">
                <h3>Values</h3>
                <p>Calm structure, caring instruction, visible growth, and learning that extends beyond the classroom into home and life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <section id="contact" className="contact-section main-contact-wrap">
        <h2>Get in Touch</h2>
        <p>Have questions? Our team is here to help.</p>
        <div className="contact-content">
          <div className="contact-details">
            <p>
              📧 Email:{' '}
              <a href="mailto:lumino@luminolearn.org">lumino@luminolearn.org</a>
            </p>
            <p>
              📞 Phone: <a href="tel:+14374241380">+1 (437) 424-1380</a>
            </p>
          </div>
          <img src={contactImg} alt="Contact Us" className="contact-img" />
        </div>
      </section>
    </div>
  );
}

export default Main;

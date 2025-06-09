import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import HomeImage from '../assets/Home.svg';
import AboutImage from '../assets/About.svg';
import Courses1Image from '../assets/courses1.jpg';
import Courses2Image from '../assets/courses2.jpg';
import Courses3Image from '../assets/courses3.jpg';
import Courses4Image from '../assets/courses4.jpg';
import PricelistImage from '../assets/Pricelist.svg';
import studyImg from '../assets/study.jpg';
import homeworkImg from '../assets/homework.jpg';
import monthlyImg from '../assets/monthly.jpg';
import beyondImg from '../assets/beyond.jpg';
import atHomeImg from '../assets/at-home.jpg';
import shelfImg from '../assets/shelf.jpg';
import wanderImg from '../assets/wander.jpg';

const colors = ['#d9b8f3', '#7dcfb6', '#f26e26', '#d9b8f3', '#7dcfb6', '#f26e26'];
const headings = [
  'Class syllabus',
  'Lesson notes and presentations',
  'Collaboration board',
  'Assignments and due dates',
  'Study guides and review materials',
  'Collaboration board'
];
const descriptions = [
  "A clear roadmap of learning goals and timelines to keep students and parents informed.",
  "Accessible and well-organized lesson content to reinforce classroom instruction.",
  "Interactive space for peer discussion, feedback, and collaborative learning.",
  "Track assignments, deadlines, and submissions all in one place.",
  "Targeted resources to support test preparation and concept mastery.",
  "Foster meaningful collaboration through shared projects and group activities."
];

function Main() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Welcome to LuminoLearn Academy</h1>
      <p>Innovative STEM, Arts & Literature, and Language Programs for Every Age.</p>

      <header className="header">
        <img src={HomeImage} alt="Home" className="header-image" />
        <div className="header-buttons">
          <button onClick={() => navigate('/login')} className="login_btn signin">Sign In</button>
          <button onClick={() => navigate('/signup')} className="login_btn signup">Sign Up</button>
        </div>
      </header>

      <section id="about">
        <img src={AboutImage} alt="About section" className="about-image" />
      </section>

      <section id="courses">
        <div className="courses-container">
          <div className="course">
            <div className="course-wrapper">
              <img src={Courses1Image} alt="Course1" className="course-image" />
              <Link to="/stem" className="enroll">REGISTER ONLINE</Link>
            </div>
          </div>
          <div className="course">
            <div className="course-wrapper">
              <img src={Courses2Image} alt="Course2" className="course-image" />
              <Link to="/art-and-craft" className="enroll">REGISTER ONLINE</Link>
            </div>
          </div>
          <div className="course">
            <div className="course-wrapper">
              <img src={Courses3Image} alt="Course3" className="course-image" />
              <Link to="/language-and-literature" className="enroll">REGISTER ONLINE</Link>
            </div>
          </div>
          <div className="course">
            <div className="course-wrapper">
              <img src={Courses4Image} alt="Course4" className="course-image" />
              <Link to="/science" className="enroll">REGISTER ONLINE</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section essentials-section" id="essentials">
        <br /> <br /> <br />
        <div className="essentials-carousel">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={true}
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

      <div className="skills-section">
        <br /><br />
        <div className="skills-grid">
          <img src={studyImg} alt="Study" className="skills-image" />
          <img src={homeworkImg} alt="Homework" className="skills-image" />
          <img src={monthlyImg} alt="Monthly" className="skills-image" />
        </div>
      </div>

      <div className="beyond-section">
        <div className="beyond-wrapper">
          <img src={beyondImg} alt="Beyond" className="beyond-image" />
          <div className="beyond-column">
            <img src={atHomeImg} alt="At Home" className="beyond-thumb" />
            <img src={shelfImg} alt="Shelf" className="beyond-thumb" />
            <img src={wanderImg} alt="Wander" className="beyond-thumb" />
          </div>
        </div>
      </div>

      <div className="pricelist-section">
        <br /> <br />
        <img src={PricelistImage} alt="Pricelist" className="pricelist-image" />
      </div>

      <section id="contact">
        <h2>Contact Us</h2>
        <p>Please contact us at lumino@luminolearn.org or call us at +1 (437) 424-1380.</p>
      </section>
    </div>
  );
}

export default Main;

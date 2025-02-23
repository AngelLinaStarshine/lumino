// src/utils/Main.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Updated import path
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import HomeImage from '../assets/Home.svg';
import AboutImage from '../assets/About.svg';
import BeyondImage from '../assets/Beyond.svg';
import SkillsImage from '../assets/Skills.svg';
import Courses1Image from '../assets/courses1.jpg';
import Courses2Image from '../assets/courses2.jpg';
import Courses3Image from '../assets/courses3.jpg';
import Courses4Image from '../assets/courses4.jpg';
import PricelistImage from '../assets/Pricelist.svg';


// Example arrays for background colors and headings:
const colors = ['#d9b8f3', '#7dcfb6', '#f26e26', '#d9b8f3', '#7dcfb6', '#f26e26'];
const headings = [
  'Class syllabus',
  'Lesson notes and presentations',
  'Collaboration board',
  'Assignments and due dates',
  'Study guides and review materials',
  'Collaboration board'
];

function Main() {
  return (
    <div className="App">
  

      {/* Header Image Section */}
      <header>
        <h1>Home</h1>
        <img src={HomeImage} alt="Home" className="header-image" />
      </header>

      {/* About Section */}
      <section id="about">
        <h2>About</h2>
        <img src={AboutImage} alt="About section" className="about-image" />
      </section>

      {/* Courses Section */}
      <section id="courses">
        <h2>Our Courses</h2>
        <div className="courses-container">
          <div className="course">
            <img src={Courses1Image} alt="Course1" className="course-image" />
            <div className="course-content">
              <a href="/stem" className="enroll">REGISTER ONLINE</a>
            </div>
          </div>

          <div className="course">
            <img src={Courses2Image} alt="Course2" className="course-image" />
            <div className="course-content">
              <a href="/art-and-craft" className="enroll">REGISTER ONLINE</a>
            </div>
          </div>

          <div className="course">
            <img src={Courses3Image} alt="Course3" className="course-image" />
            <div className="course-content">
              <a href="/language-and-literature" className="enroll">REGISTER ONLINE</a>
            </div>
          </div>

          <div className="course">
            <img src={Courses4Image} alt="Course4" className="course-image" />
            <div className="course-content">
              <a href="/science" className="enroll">REGISTER ONLINE</a>
            </div>
          </div>
        </div>
      </section>

      {/* Classroom Essentials Section */}
      <div className="section essentials-section" id="essentials">
        <h2>Classroom Essentials</h2>
        <div className="essentials-carousel">
          <Swiper
            // We still list the modules here if desired, though it's optional now:
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{ clickable: true }}
          >
            {colors.map((color, index) => (
              <SwiperSlide key={index} style={{ backgroundColor: color }}>
                <h3>{headings[index]}</h3>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h3>Our Skills</h3>
        <img src={SkillsImage} alt="Skills" className="skills-image" />
      </div>

      {/* Beyond Section */}
      <div className="beyond-section">
        <h3>Go Beyond</h3>
        <img src={BeyondImage} alt="Beyond" className="beyond-image" />
      </div>

      {/* Pricelist Section */}
      <div className="pricelist-section">
        <h3>Price List</h3>
        <img src={PricelistImage} alt="Pricelist" className="pricelist-image" />
      </div>

      {/* Contact Section */}
      <section id="contact">
        <h2>Contact Us</h2>
        <p>Please contact us at info@luminolearn.com or call 123-456-7890.</p>
      </section>
  
    </div>
  );
}

export default Main;
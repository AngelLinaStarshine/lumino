import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import contactImg from '../assets/contact.png';


import HomeImage from '../assets/Home.svg';
import AboutImage from '../assets/About.svg';
import Courses1Image from '../assets/courses1.png';
import Courses2Image from '../assets/courses2.png';
import Courses3Image from '../assets/courses3.png';
import flameGif from '../assets/flame.gif';
import PricelistImage from '../assets/Pricelist.svg';
import studyImg from '../assets/study.jpg';
import homeworkImg from '../assets/homework.jpg';
import monthlyImg from '../assets/monthly.jpg';
import beyondImg from '../assets/beyond.jpg';
import atHomeImg from '../assets/at-home.png';
import shelfImg from '../assets/shelf.png';
import arrowImg from '../assets/arrowImg.svg';
import wanderImg from '../assets/wander.png';
import HeartIcon from '../assets/heart.svg';
import starImg from '../assets/star.svg';
import bellIcon from '../assets/bell.svg';


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
useEffect(() => {
  const text = "LuminoLearn Academy";
  const element = document.getElementById("typed-brand");
  let index = 0;
  let interval;

  const type = () => {
    if (!element) return;
    element.textContent = "";
    index = 0;
    interval = setInterval(() => {
      element.textContent += text.charAt(index);
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setTimeout(type, 4000); // Pause for 3 seconds before restarting
      }
    }, 150);
  };

  type();

  return () => clearInterval(interval);
}, []);


  return (

<div className="App">
  <div className="welcome-section" style={{ position: 'relative' }}>
    {/* flame pinned to top-left of this section */}
  <img
      src={flameGif}
      alt=""
      aria-hidden="true"
      className="flame-badge"
      style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        width: '170px',
        pointerEvents: 'none',
        zIndex: 20,
        transform: 'none',           // neutralize any global transform
        margin: 0                    // neutralize global centering
      }}
    />

   
    <h1 className="welcome-heading text-4xl md:text-5xl font-extrabold text-gray-800 leading-snug mb-6">
      <br />
      <span id="typed-brand" className="brand-name highlight text-indigo-700"></span>
    </h1>

  <p className="welcome-subtext text-lg md:text-xl text-gray-800 leading-relaxed mb-2">
  We don’t just teach — 
  we craft futures. 
</p>
 


    <p className="welcome-tagline text-3xl italic text-gray-700 animate-fadeIn delay-200">
      Fueling Wonder. Empowering Minds.
    </p>
  </div>


<br>
</br>
      <header className="header">
        <img src={HomeImage} alt="Home" className="header-image" />
        <div className="header-buttons">
          <img src={arrowImg} alt="Next" className="animated-arrow" />
          <button onClick={() => navigate('/login')} className="login_btn signin">Sign In</button>
          <button onClick={() => navigate('/signup')} className="login_btn signup">Sign Up</button>
        </div>
      </header>

      <section id="about" className="about-section">
        <div className="about-image-wrapper">
          <img src={AboutImage} alt="About section" className="about-image" />
          <img src={HeartIcon} alt="Heart icon" className="heart-icon-centered" />
        </div>
      </section>

      <section id="courses">
        <div className="courses-container">
          {[Courses1Image, Courses2Image, Courses3Image].map((img, index) => (
            <div key={index} className="course">
              <div className="course-wrapper">
                <img src={img} alt={`Course${index + 1}`} className="course-image" />
                <Link to={['/stem', '/art-and-craft', '/language-and-literature', '/science'][index]} className="enroll">
                  REGISTER ONLINE
                </Link>
              </div>
            </div>
          ))}
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

      <div className="skills-wrapper">
    
        <div className="skills-grid">
          <img src={studyImg} alt="Study" className="skills-image" />
          <img src={homeworkImg} alt="Homework" className="skills-image" />
          <img src={monthlyImg} alt="Monthly" className="skills-image" />
        </div>
      </div>

      <div className="beyond-section">
        <img src={starImg} alt="Star" className="animated-star" />
        <div className="beyond-wrapper">
          <img src={beyondImg} alt="Beyond" className="beyond-image" />
          <div className="beyond-column">
            <img src={atHomeImg} alt="At Home" className="beyond-thumb" />
            <img src={shelfImg} alt="Shelf" className="beyond-thumb" />
            <img src={wanderImg} alt="Wander" className="beyond-thumb" />
          </div>
        </div>
      </div>

      <div className="pricelist-wrapper">
        <img src={PricelistImage} alt="Pricelist" className="pricelist-image" />
        <img src={bellIcon} alt="Bell" className="animated-bell" />
      </div>
<section id="contact" className="contact-section">
  <h2>Get in Touch</h2>
  <p>Have questions or need assistance? Our team is here to help.</p>

  <div className="contact-content">
    <img src={contactImg} alt="Contact Us" className="contact-img" />
    <div className="contact-details">
      <p>
        📧 Email: <a href="mailto:lumino@luminolearn.org">lumino@luminolearn.org</a>
      </p>
      <p>
        📞 Phone: <a href="tel:+14374241380">+1 (437) 424-1380</a>
      </p>
    </div>
  </div>
</section>


    </div>
  );
}

export default Main;
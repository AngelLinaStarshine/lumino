import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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



// ✅ REMOVE duplicate export if already declared elsewhere
// ✅ Place this inside Main.js (or a utility file if preferred)

// LOGIN FUNCTION
const handleMainLogin = () => {
  Swal.fire({
    title: 'Login',
    html: `
      <input type="email" id="main_email" class="swal2-input" placeholder="Email">
      <input type="password" id="main_password" class="swal2-input" placeholder="Password">
    `,
    confirmButtonText: 'Login',
    showCancelButton: true,
    preConfirm: () => {
      const email = Swal.getPopup().querySelector('#main_email').value;
      const password = Swal.getPopup().querySelector('#main_password').value;

      if (!email || !password) {
        return Swal.showValidationMessage('Email and password are required');
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const matched = users.find(u => u.email === email && atob(u.password) === password);

      if (!matched) {
        return Swal.showValidationMessage('Invalid email or password');
      }

      sessionStorage.setItem('loggedInUser', JSON.stringify(matched));
      return matched;
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      Swal.fire('Login Successful', 'Redirecting to your account...', 'success').then(() => {
        window.location.href = '/account';
      });
    }
  });
};

// REGISTER FUNCTION
const handleRegister = () => {
  Swal.fire({
    title: 'Register',
    html: `
      <input type="text" id="reg_firstName" class="swal2-input" placeholder="First Name">
      <input type="text" id="reg_lastName" class="swal2-input" placeholder="Last Name">
      <input type="email" id="reg_email" class="swal2-input" placeholder="Email">
      <input type="password" id="reg_password" class="swal2-input" placeholder="Password">
      <input type="password" id="reg_confirmPassword" class="swal2-input" placeholder="Confirm Password">
    `,
    confirmButtonText: 'Sign Up',
    showCancelButton: true,
    preConfirm: () => {
      const firstName = Swal.getPopup().querySelector('#reg_firstName').value.trim();
      const lastName = Swal.getPopup().querySelector('#reg_lastName').value.trim();
      const email = Swal.getPopup().querySelector('#reg_email').value.trim();
      const password = Swal.getPopup().querySelector('#reg_password').value;
      const confirmPassword = Swal.getPopup().querySelector('#reg_confirmPassword').value;

      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return Swal.showValidationMessage('All fields are required');
      }

      if (password !== confirmPassword) {
        return Swal.showValidationMessage('Passwords do not match');
      }

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (existingUsers.some(u => u.email === email)) {
        return Swal.showValidationMessage('User with this email already exists');
      }

      const newUser = {
        firstName,
        lastName,
        email,
        password: btoa(password), // Note: base64 is not secure for real apps
      };

      return newUser;
    }
  }).then(result => {
    if (result.isConfirmed && result.value) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(result.value);
      localStorage.setItem('users', JSON.stringify(users));
      sessionStorage.setItem('loggedInUser', JSON.stringify(result.value));

      Swal.fire('Registered!', 'You have successfully created an account.', 'success').then(() => {
        window.location.href = '/account';
      });
    }
  });
};



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
  return (
    <div className="App">

      {/* Header Image Section */}
<header className="header">
  <img src={HomeImage} alt="Home" className="header-image" />
  <div className="header-buttons">
    <button onClick={handleMainLogin} className="login_btn signin">Sign In</button>
    <button onClick={handleRegister} className="login_btn signup">Sign Up</button>
  </div>
</header>


      {/* About Section */}
      <section id="about">
     
        <img src={AboutImage} alt="About section" className="about-image" />
      </section>

      {/* Courses Section */}
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

      {/* Classroom Essentials Section */}
      <div className="section essentials-section" id="essentials">
      <br></br> <br></br> <br></br>
      
        <div className="essentials-carousel">
          <Swiper
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
                 <div className="slide-content">
                  <h3>{headings[index]}</h3>
                  <p>{descriptions[index]}</p>
                   </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    {/* Skills Section */}
<div className="skills-section">
  <br /><br />
  <div className="skills-grid">
  <img src={studyImg} alt="Study" className="skills-image" />
<img src={homeworkImg} alt="Homework" className="skills-image" />
<img src={monthlyImg} alt="Monthly" className="skills-image" />

  </div>
</div>

      {/* Beyond Section */}
      <div className="beyond-section">
  <div className="beyond-wrapper">
    {/* Left image */}
    <img src={beyondImg} alt="Beyond" className="beyond-image" />

    {/* Right column of 3 images */}
    <div className="beyond-column">
      <img src={atHomeImg} alt="At Home" className="beyond-thumb" />
      <img src={shelfImg} alt="Shelf" className="beyond-thumb" />
      <img src={wanderImg} alt="Wander" className="beyond-thumb" />
    </div>
  </div>
</div>



      {/* Pricelist Section */}
      <div className="pricelist-section">
      <br></br> <br></br>
        <img src={PricelistImage} alt="Pricelist" className="pricelist-image" />
      </div>

      {/* Contact Section */}
      <section id="contact">
        <h2>Contact Us</h2>
        <p>Please contact us at lumino@luminolearn.org or call us at +1 (437) 424-1380.</p>
      </section>

    </div>
  );
}

export default Main;
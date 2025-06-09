import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Stem() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRedirectToSignup = () => {
    navigate('/signup');
  };

  const courses = [
    {
      title: "Early Learners (Ages 3–5)",
      description: "This sensory-based program introduces foundational STEM concepts through play, exploration, and discovery.",
      color: "#ffb6b9",
      details: "Children in this age group explore tactile experiments, number games, and storytelling that promote science vocabulary, fine motor control, and logical association.",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6",
      testLink: "/assessment-early-learners"
    },
    {
      title: "Primary Learners (Ages 6–8)",
      description: "Early problem-solving and logical reasoning skills using science, math, and engineering tasks.",
      color: "#f9971d",
      details: "Focuses on sequencing, counting, estimation, and pattern recognition through fun experiments.",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18",
      testLink: "/assessment-primary-learners"
    },
    {
      title: "Intermediate Learners (Ages 9–11)",
      description: "Enhance STEM foundations with collaborative experiments and problem-solving challenges.",
      color: "#7DCFB6",
      details: "Includes basic coding with Scratch, LEGO robotics, data collection labs, and science fair-style design projects.",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7",
      testLink: "/assessment-intermediate-learners"
    },
    {
      title: "Emerging Teens (Ages 12–14)",
      description: "Dive into coding, electronics, and ethical technology use.",
      color: "#d9b8f3",
      details: "Teens work on HTML/CSS coding, circuit boards, and real-world problem research.",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9",
      testLink: "/assessment-emerging-teens"
    },
    {
      title: "Future Pathways (Ages 15–17)",
      description: "Explore AI, cybersecurity, and future-ready STEM applications.",
      color: "#0571d3",
      details: "Advanced curriculum with Python, ethical hacking, machine learning, and quantum computing.",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7",
      testLink: "/assessment-future-pathways"
    }
  ];

  return (
    <div className="course-page">
      <h1>STEM Pathways – Course Registration</h1>
      <p>
        At LuminoLearn, our STEM curriculum supports learners aged 3–17 in developing real-world skills through fun, structured, age-appropriate programs.
        <br /><br />
        {!isLoggedIn && (
          <>
            <strong>To register and take the assessment test, please create an account first.</strong>
            <br />
            <button onClick={handleRedirectToSignup} className="inline-register-link">Create Account</button>
          </>
        )}
      </p>

      <h2>Explore Our Age-Based STEM Courses</h2>
      <div className="course-grid">
        <div className="row">
          {courses.slice(0, 2).map((course, index) => (
            <div key={index} className="course-block" style={{ backgroundColor: course.color }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="read-more-btn" onClick={() => setSelectedCourse(course)}>📖 Read More</button>
              {isLoggedIn && (
                <div className="course-links">
                  <a href={course.formLink} target="_blank" rel="noreferrer">📋 Registration Form</a>
                  <a href={course.testLink} target="_blank" rel="noreferrer">🧪 Take Test</a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="row">
          {courses.slice(2).map((course, index) => (
            <div key={index + 2} className="course-block" style={{ backgroundColor: course.color }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="read-more-btn" onClick={() => setSelectedCourse(course)}>📖 Read More</button>
              {isLoggedIn && (
                <div className="course-links">
                  <a href={course.formLink} target="_blank" rel="noreferrer">📋 Registration Form</a>
                  <a href={course.testLink} target="_blank" rel="noreferrer">🧪 Take Test</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCourse.title}</h2>
            <p>{selectedCourse.details}</p>
            <button className="close-modal" onClick={() => setSelectedCourse(null)}>✖ Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stem;

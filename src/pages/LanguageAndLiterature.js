import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LanguageAndLiterature() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (user) {
      setAccountConfirmed(true);
    }
  }, []);

  const handleRedirectToSignup = () => {
    navigate('/signup');
  };

  const courses = [
    {
      title: "Early Readers / Ages 3–5",
      description: "Phonics, rhymes, and early word recognition to nurture a love for books.",
      color: "#f4d35e",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6",
      testLink: "#",
      details: "Fun phonics songs, word games, and interactive storytelling build foundational language confidence."
    },
    {
      title: "Primary Language / Ages 6–8",
      description: "Explore basic grammar, storytelling, and reading fluency through engaging activities.",
      color: "#7dcfb6",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18",
      testLink: "#",
      details: "Learn sentence structure, descriptive language, and read-aloud strategies to boost fluency."
    },
    {
      title: "Literary Explorers / Ages 9–11",
      description: "Dive into short stories, reading comprehension, and writing fundamentals.",
      color: "#f9971d",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7",
      testLink: "#",
      details: "Engage with plot, setting, character, and write summaries, reflections, and short fiction."
    },
    {
      title: "Emerging Writers / Ages 12–14",
      description: "Sharpen creative and academic writing skills, from essays to poetry.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9",
      testLink: "#",
      details: "Practice persuasive, narrative, and poetic writing through projects and peer review."
    },
    {
      title: "Language & Society / Ages 15–17",
      description: "Study classical literature, critical analysis, debate, and language for global use.",
      color: "#0571d3",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7",
      testLink: "#",
      details: "Explore world literature, conduct text analysis, and prepare oral presentations and essays."
    }
  ];

  return (
    <div className="course-page">
      <h1>Languages and Literature</h1>
      <p>
        Welcome to our Languages and Literature courses. From early reading to critical analysis,
        we nurture confident readers, thoughtful writers, and global communicators.
        <br /><br />
        <strong>To register and take the assessment test, please create an account first.</strong>
        <br />
        {!accountConfirmed && (
          <button onClick={handleRedirectToSignup} className="inline-register-link">Create Account</button>
        )}
      </p>
      <h2>Select a Course Below</h2>

      <div className="course-grid">
        <div className="row">
          {courses.slice(0, 2).map((course, index) => (
            <div key={index} className="course-block" style={{ backgroundColor: course.color }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="read-more-btn" onClick={() => setSelectedCourse(course)}>📖 Read More</button>
              {accountConfirmed && (
                <div className="course-links">
                  <a href={course.formLink} target="_blank" rel="noreferrer">Fill Registration Form</a>
                  <a href={course.testLink} target="_blank" rel="noreferrer">Take Entry Assessment (Coming Soon)</a>
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
              {accountConfirmed && (
                <div className="course-links">
                  <a href={course.formLink} target="_blank" rel="noreferrer">Fill Registration Form</a>
                  <a href={course.testLink} target="_blank" rel="noreferrer">Take Entry Assessment (Coming Soon)</a>
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

export default LanguageAndLiterature;

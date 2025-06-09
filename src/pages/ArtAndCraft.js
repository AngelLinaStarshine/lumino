import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ArtAndCraft() {
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
      title: "Creative Starters / Ages 3–5",
      description: "Hands-on sensory art play: colors, textures, shapes and safe craft tools.",
      color: "#f6c0d0",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6",
      testLink: "#",
      details: "Children experiment with paint, clay, and recycled materials, developing creativity, motor skills, and self-expression."
    },
    {
      title: "Mini Makers / Ages 6–8",
      description: "Painting, cutting, folding, and gluing: creative exercises and guided imagination.",
      color: "#f9971d",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18",
      testLink: "#",
      details: "Projects focus on collage, sculpture basics, story-based crafts, and exposure to famous artists and art styles."
    },
    {
      title: "Young Designers / Ages 9–11",
      description: "Learn about color theory, basic design, mixed media, and create personal portfolios.",
      color: "#7DCFB6",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7",
      testLink: "#",
      details: "Students explore painting techniques, printmaking, 3D construction, and present their own exhibition pieces."
    },
    {
      title: "Teen Creators / Ages 12–14",
      description: "Master techniques like shading, perspective, and sculpture using real artist tools.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9",
      testLink: "#",
      details: "Teens develop sketchbooks, explore charcoal, digital art, and study contemporary and classical artists."
    },
    {
      title: "Portfolio Prep / Ages 15–17",
      description: "Build portfolios for college, learn digital art, and exhibit personal masterpieces.",
      color: "#0571d3",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7",
      testLink: "#",
      details: "Portfolio creation, critique sessions, digital design tools, and exhibition planning included."
    }
  ];

  return (
    <div className="course-page">
      <h1>Art & Craft Registration</h1>
      <p>
        Welcome to our Art & Craft courses where creative expression meets skill-building.
        Explore drawing, painting, mixed media, sculpture, and more!
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

export default ArtAndCraft;

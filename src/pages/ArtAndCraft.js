import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import extendedDescriptions from './artDescriptions';

function ArtAndCraft() {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
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

  const gradeTestLinks = {
    "Grade 1": "https://forms.gle/LsQUbC4DGxB3zusL6",
    "Grade 2": "https://forms.gle/C1bWie8ustcSrs4k7",
    "Grade 3": "https://forms.gle/LAKErhdGgA1Ctfdo8",
    "Grade 4": "https://forms.gle/WbPzm3eZ9TNHw4Mi9",
    "Grade 5": "https://forms.gle/6yxNwE45LpAQpPet9",
    "Grade 6": "https://forms.gle/bxfgZvpspLH3xjPK7",
    "Grade 7": "https://forms.gle/WPaUurjwafBuZP1J6",
    "Grade 8": "https://forms.gle/9cranZbA1L1bVpE89",
    "Grade 9": "https://forms.gle/ephHzrmJZpPFKFQQ9",
    "Grade 10": "https://forms.gle/e33ugNdoyrxvasgr7",
    "Grade 11": "https://forms.gle/iLfZpYjn3NRygv4k8",
    "Grade 12": "https://forms.gle/d7sXrjo3ieLavFc7A"
  };

  const courses = [
    {
      title: "Creative Starters / Ages 3–5",
      description: "Hands-on sensory art play: colors, textures, shapes and safe craft tools.",
      color: "#f6c0d0",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6"
    },
    {
      title: "Mini Makers / Ages 6–8",
      description: "Painting, cutting, folding, and gluing: creative exercises and guided imagination.",
      color: "#f9971d",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18"
    },
    {
      title: "Young Designers / Ages 9–11",
      description: "Learn about color theory, basic design, mixed media, and create personal portfolios.",
      color: "#7DCFB6",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7"
    },
    {
      title: "Teen Creators / Ages 12–14",
      description: "Master techniques like shading, perspective, and sculpture using real artist tools.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9"
    },
    {
      title: "Portfolio Prep / Ages 15–17",
      description: "Build portfolios for college, learn digital art, and exhibit personal masterpieces.",
      color: "#0571d3",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7"
    }
  ];

  const gradeOptions = [
    { label: 'Junior Kindergarten (JK)', courseIndex: 0 },
    { label: 'Senior Kindergarten (SK)', courseIndex: 0 },
    { label: 'Grade 1', courseIndex: 1 },
    { label: 'Grade 2', courseIndex: 1 },
    { label: 'Grade 3', courseIndex: 2 },
    { label: 'Grade 4', courseIndex: 2 },
    { label: 'Grade 5', courseIndex: 2 },
    { label: 'Grade 6', courseIndex: 3 },
    { label: 'Grade 7', courseIndex: 3 },
    { label: 'Grade 8', courseIndex: 3 },
    { label: 'Grade 9', courseIndex: 4 },
    { label: 'Grade 10', courseIndex: 4 },
    { label: 'Grade 11', courseIndex: 4 },
    { label: 'Grade 12', courseIndex: 4 }
  ];

  const selectedGradeObj = gradeOptions.find(g => g.label === selectedGrade);
  const selectedCourseFromGrade = selectedGradeObj ? courses[selectedGradeObj.courseIndex] : null;
  const testLink = gradeTestLinks[selectedGrade] || (selectedCourseFromGrade && selectedCourseFromGrade.testLink);
  const extendedDetails = selectedCourseFromGrade ? extendedDescriptions[selectedCourseFromGrade.title] : '';

  return (
    <div className="course-page">
      <h1>Art & Craft – Course Registration</h1>
      <p>
        Our Art & Craft curriculum sparks imagination and strengthens fine motor skills. Explore drawing, sculpture, color theory, and digital creativity at every age!
        <br /><br />
        {!isLoggedIn && (
          <>
            <strong>To register and take the assessment test, please create an account first.</strong>
            <br />
            <button onClick={handleRedirectToSignup} className="inline-register-link">Create Account</button>
          </>
        )}
      </p>

      {isLoggedIn && (
        <>
          <div className="grade-selector">
            <label htmlFor="grade-select"><strong>Choose Your Grade:</strong></label>
            <select
              id="grade-select"
              onChange={(e) => setSelectedGrade(e.target.value)}
              defaultValue=""
            >
              <option value="">-- Select Grade --</option>
              {gradeOptions.map((grade, index) => (
                <option key={index} value={grade.label}>{grade.label}</option>
              ))}
            </select>
          </div>

          {selectedCourseFromGrade && (
            <div className="selected-course-info">
              <h3>Assessment for {selectedGrade}</h3>
              <p>{extendedDetails}</p>
              <div className="assessment-note">
                <p><strong>Why This Assessment?</strong> This creative assessment helps us evaluate the learner’s current level, interests, and artistic techniques. Results are stored for 7 days only and cannot be recovered once expired.</p>
              </div>
              {testLink && (
                <p>
                  🎨{' '}
                  <a href={testLink} target="_blank" rel="noreferrer">
                    Click here to take the assessment test
                  </a>
                </p>
              )}
            </div>
          )}
        </>
      )}

      <h2>Explore Our Age-Based Art & Craft Courses</h2>
      <div className="course-grid">
        <div className="row">
          {courses.slice(0, 2).map((course, index) => (
            <div key={index} className="course-block" style={{ backgroundColor: course.color }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="read-more-btn" onClick={() => setSelectedCourse(course)}>📖 Read More</button>
              {isLoggedIn && (
                <div className="course-links">
                  <a href={course.formLink} target="_blank" rel="noreferrer">📝 Registration Form</a>
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
                  <a href={course.formLink} target="_blank" rel="noreferrer">📝 Registration Form</a>
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
            <p>{extendedDescriptions[selectedCourse.title]}</p>
            <button className="close-modal" onClick={() => setSelectedCourse(null)}>✖ Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtAndCraft;

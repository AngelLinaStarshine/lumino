import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import extendedDescriptions from './languageDescriptions';

function LanguageAndLiterature() {
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
    "Grade 1": "https://forms.gle/VjNWtVN5fZoL4ok18",
    "Grade 2": "https://forms.gle/sPj7TrL9M9B6RnrDA",
    "Grade 3": "https://forms.gle/ynxCFCin8eLLF1Kj8",
    "Grade 4": "https://forms.gle/gwwK14fyqrrznG229",
    "Grade 5": "https://forms.gle/C3YpQu1cd7JXVthJ9",
    "Grade 6": "https://forms.gle/1fVQXA12ebrcRyDu8",
    "Grade 7": "https://forms.gle/VyQfi2CkWw9qz4tq6",
    "Grade 8": "https://forms.gle/8StBuZjc2csYSDGBA",
    "Grade 9": "https://forms.gle/FErkEntEokdouUEZA",
    "Grade 10": "https://forms.gle/zWbtps7uH1pGeGQCA",
    "Grade 11": "https://forms.gle/kgyB6cG8Aiu91a3D7",
    "Grade 12": "https://forms.gle/DyF5PJsi4mDmXZLB7"
  };

  const gradeOptions = [
    { label: 'Grade 1', courseIndex: 0 },
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

  const courses = [
    {
      title: "Early Readers / Ages 3–5",
      description: "Phonics, rhymes, and early word recognition to nurture a love for books.",
      color: "#f4d35e",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6"
    },
    {
      title: "Primary Language / Ages 6–8",
      description: "Explore basic grammar, storytelling, and reading fluency through engaging activities.",
      color: "#7dcfb6",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18"
    },
    {
      title: "Literary Explorers / Ages 9–11",
      description: "Dive into short stories, reading comprehension, and writing fundamentals.",
      color: "#f9971d",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7"
    },
    {
      title: "Emerging Writers / Ages 12–14",
      description: "Sharpen creative and academic writing skills, from essays to poetry.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9"
    },
    {
      title: "Language & Society / Ages 15–17",
      description: "Study classical literature, critical analysis, debate, and language for global use.",
      color: "#0571d3",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7"
    }
  ];

  const selectedGradeObj = gradeOptions.find(g => g.label === selectedGrade);
  const gradeSelectedCourse = selectedGradeObj ? courses[selectedGradeObj.courseIndex] : null;
  const testLink = gradeTestLinks[selectedGrade] || (gradeSelectedCourse && gradeSelectedCourse.testLink);
  const extendedDetails = gradeSelectedCourse ? extendedDescriptions[gradeSelectedCourse.title] : '';

  return (
    <div className="course-page">
      <h1>Languages and Literature</h1>
      <p>
        Welcome to our Languages and Literature courses. From early reading to critical analysis,
        we nurture confident readers, thoughtful writers, and global communicators.
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

          {gradeSelectedCourse && (
            <div className="selected-course-info">
              <h3>Assessment for {selectedGrade}</h3>
              <p>{extendedDetails}</p>
              <div className="assessment-note">
                <p><strong>Why This Assessment?</strong> This assessment helps us identify the learner's reading and writing level, allowing us to tailor instruction effectively. Test results are retained for 7 days only and will be permanently deleted afterward.</p>
              </div>
              {testLink && (
                <p>
                  📘{' '}
                  <a href={testLink} target="_blank" rel="noreferrer">
                    Click here to take the entry assessment
                  </a>
                </p>
              )}
            </div>
          )}
        </>
      )}

      <h2>Explore Our Age-Based Language Courses</h2>
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

export default LanguageAndLiterature;

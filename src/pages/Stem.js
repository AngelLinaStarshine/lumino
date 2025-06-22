import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import extendedDescriptions from './extendedDescriptions';

function Stem() {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
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
    "Grade 1": "https://forms.gle/JiaUMJCg1HLs2r7r8",
    "Grade 2": "https://forms.gle/qUq6Sdpyo7Tgc8Co6",
    "Grade 3": "https://forms.gle/T4JzrYkyTrcNv3Fx5",
    "Grade 4": "https://forms.gle/tjsfuNRBvmL5TYLm7",
    "Grade 5": "https://forms.gle/DN4goUU3vdvLCEu97",
    "Grade 6": "https://forms.gle/DPDYaqXCH9rdUeKX6",
    "Grade 7": "https://forms.gle/aPSPAdjiFHXUnB21A",
    "Grade 8": "https://forms.gle/QUSeyry1EfTGDEJF6",
    "Grade 9": "https://forms.gle/zbw1NKaaAj2bSeJk7",
    "Grade 10": "https://forms.gle/MghjnQB3sGbKiNym7",
    "Grade 11": "https://forms.gle/yvotX42xUv4fZj516",
    "Grade 12": "https://forms.gle/5nPFuFV939Ru43wu7"
  };

  const courses = [
    {
      title: "Early Learners (Ages 3–5)",
      description: "This sensory-based program introduces foundational STEM concepts through play, exploration, and discovery.",
      color: "#ffb6b9",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6"
    },
    {
      title: "Primary Learners (Ages 6–8)",
      description: "Early problem-solving and logical reasoning skills using science, math, and engineering tasks.",
      color: "#f9971d",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18"
    },
    {
      title: "Intermediate Learners (Ages 9–11)",
      description: "Enhance STEM foundations with collaborative experiments and problem-solving challenges.",
      color: "#7DCFB6",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7"
    },
    {
      title: "Emerging Teens (Ages 12–14)",
      description: "Dive into coding, electronics, and ethical technology use.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9"
    },
    {
      title: "Future Pathways (Ages 15–17)",
      description: "Explore AI, cybersecurity, and future-ready STEM applications.",
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
  const selectedCourse = selectedGradeObj ? courses[selectedGradeObj.courseIndex] : null;
  const testLink = gradeTestLinks[selectedGrade] || (selectedCourse && selectedCourse.testLink);
  const extendedDetails = selectedCourse ? extendedDescriptions[selectedCourse.title] : '';

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

          {selectedCourse && (
            <div className="selected-course-info">
              <h3>Assessment for {selectedGrade}</h3>
              <p>{extendedDetails}</p>
              <div className="assessment-note">
                <p><strong>Why This Assessment?</strong> This comprehensive assessment helps us evaluate the learner’s current knowledge level and ensure appropriate course placement. Assessment results are stored for 7 days only and cannot be recovered once expired.</p>
              </div>
              {testLink && (
                <p>
                  🧪{' '}
                  <a href={testLink} target="_blank" rel="noreferrer">
                    Click here to take the assessment test
                  </a>
                </p>
              )}
            </div>
          )}
        </>
      )}

      <h2>Explore Our Age-Based STEM Courses</h2>
      <div className="course-grid">
        <div className="row">
          {courses.slice(0, 2).map((course, index) => (
            <div key={index} className="course-block" style={{ backgroundColor: course.color }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="read-more-btn" onClick={() => setSelectedCourseDetails(course)}>📖 Read More</button>
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
              <button className="read-more-btn" onClick={() => setSelectedCourseDetails(course)}>📖 Read More</button>
              {isLoggedIn && (
                <div className="course-links">
                  <a href={course.formLink} target="_blank" rel="noreferrer">📋 Registration Form</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedCourseDetails && (
        <div className="modal-overlay" onClick={() => setSelectedCourseDetails(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCourseDetails.title}</h2>
            <p>{extendedDescriptions[selectedCourseDetails.title]}</p>
            <button className="close-modal" onClick={() => setSelectedCourseDetails(null)}>✖ Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stem;
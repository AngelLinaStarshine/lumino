import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import extendedDescriptions from './scienceDescriptions';

function Science() {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);
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
    "Grade 1": "https://forms.gle/gFta64puP7qU9JgHA",
    "Grade 2": "https://forms.gle/47d6PPu3QUvmVP3t7",
    "Grade 3": "https://forms.gle/Z6nx9oSCJaZ6pHN58",
    "Grade 4": "https://forms.gle/sdBC4o2huZ8hzFeXA",
    "Grade 5": "https://forms.gle/ox87EhGgPNUXYFbg8",
    "Grade 6": "https://forms.gle/8bU99kMdrdEcphbz8",
    "Grade 7": "https://forms.gle/4a6USVprVsVKbzAW7",
    "Grade 8": "https://forms.gle/LqzPG7vtQVQERizc9",
    "Grade 9": "https://forms.gle/99nGdsEbVCovTy4C6",
    "Grade 10": "https://forms.gle/L1NYwWBxpZSGWbBR8",
    "Grade 11": "https://forms.gle/SFw4LAxHjTuHmboi7",
    "Grade 12": "https://forms.gle/NS8gKZFDNiv3oQ1w9"
  };

  const courses = [
    {
      title: "Early Learners / Ages 3–5",
      description: "Explore science and nature through sensory-based experiments and play-based discovery.",
      color: "#ffb6b9",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6"
    },
    {
      title: "Primary Learners / Ages 6–8",
      description: "Beginner science and geography exploration through maps, plants, weather and ecosystems.",
      color: "#f9971d",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18"
    },
    {
      title: "Intermediate Learners / Ages 9–11",
      description: "Hands-on projects to investigate life, earth, and physical science topics in more depth.",
      color: "#7DCFB6",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7"
    },
    {
      title: "Emerging Teens / Ages 12–14",
      description: "Build critical thinking through inquiry-based labs and global geography case studies.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9"
    },
    {
      title: "Future Pathways / Ages 15–17",
      description: "Deep dive into applied sciences, sustainability, environmental issues, and climate strategy.",
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
      <h1>Science & Geography – Course Registration</h1>
      <p>
        Our Science & Geography curriculum fosters curiosity through hands-on learning, map skills, Earth systems, environmental science, and inquiry-based experiments.
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
                <p><strong>Why This Assessment?</strong> This evaluation helps us understand your learner’s current understanding and interests. Results are kept for 7 days only and cannot be recovered afterward.</p>
              </div>
              {testLink && (
                <p>
                  🌍{' '}
                  <a href={testLink} target="_blank" rel="noreferrer">
                    Click here to take the assessment test
                  </a>
                </p>
              )}
            </div>
          )}
        </>
      )}

      <h2>Explore Our Age-Based Science & Geography Courses</h2>
      <div className="course-grid">
        <div className="row">
          {courses.slice(0, 2).map((course, index) => (
            <div key={index} className="course-block" style={{ backgroundColor: course.color }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="read-more-btn" onClick={() => setSelectedCourseModal(course)}>📖 Read More</button>
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
              <button className="read-more-btn" onClick={() => setSelectedCourseModal(course)}>📖 Read More</button>
              {isLoggedIn && (
                <div className="course-links">
                  <a href={course.formLink} target="_blank" rel="noreferrer">📝 Registration Form</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedCourseModal && (
        <div className="modal-overlay" onClick={() => setSelectedCourseModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCourseModal.title}</h2>
            <p>{extendedDescriptions[selectedCourseModal.title]}</p>
            <button className="close-modal" onClick={() => setSelectedCourseModal(null)}>✖ Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Science;

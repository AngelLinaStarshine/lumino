import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import extendedDescriptions from './artDescriptions';

function ArtAndCraft() {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) setIsLoggedIn(true);
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
  const selectedCourse = selectedGradeObj ? courses[selectedGradeObj.courseIndex] : null;
  const testLink = gradeTestLinks[selectedGrade] || (selectedCourse && selectedCourse.testLink);
  const extendedDetails = selectedCourse ? extendedDescriptions[selectedCourse.title] || '' : '';

  return (
    <div className="course-page px-4 md:px-10 py-12 max-w-5xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center">Art & Craft Courses – Express & Enroll</h1>

      <p className="custom-welcome">
        Our Art & Craft curriculum sparks imagination, supports motor development, and builds a strong design foundation. Learners explore drawing, 3D building, digital art, and portfolio creation across every age.
      </p>

      <div className="mt-10 bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded">
        <h2 className="text-2xl font-bold mb-3">🛠️ How Registration Works</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li><strong>Create an Account:</strong> Sign up to unlock the registration and assessment forms.</li>
          <li><strong>Complete the Assessment:</strong> After logging in, access the personalized grade-level assessment form.</li>
          <li><strong>Review & Feedback:</strong> Within 48 hours, our educators will review results and generate feedback outlining your child’s knowledge level, learning style, and educational fit.</li>
          <li><strong>Schedule a Consultation:</strong> Meet with our team to align goals and customize your child’s educational path.</li>
          <li><strong>Finalize Registration:</strong> Review courses and complete the enrollment process.</li>
        </ul>
        <p className="mt-4">🧠 This assessment helps us understand how your child learns and where they currently stand. It includes personalized insights to support both academic progress and cognitive growth.</p>
        <p className="mt-2">📅 You’ll be invited to schedule a 1:1 consultation where we’ll walk through the results and help choose the best-fit course.</p>
        {!isLoggedIn && (
          <p className="mt-4">To access the assessment test and register for your personalized course, please create your account first.</p>
        )}
      </div>

      {!isLoggedIn && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-sm border-l-4 border-indigo-400">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Begin?</h3>
          <p className="text-lg text-gray-700 mb-4">Please create your account to access assessments and enroll in Art & Craft courses.</p>
          <button
            onClick={handleRedirectToSignup}
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium transition"
          >
            Create Account
          </button>
        </div>
      )}

      {isLoggedIn && (
        <>
          <div className="grade-selector my-6 px-4">
            <label htmlFor="grade-select" className="block mb-2 text-lg font-semibold text-gray-800">Choose Your Grade:</label>
            <select
              id="grade-select"
              onChange={(e) => setSelectedGrade(e.target.value)}
              defaultValue=""
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Select Grade --</option>
              {gradeOptions.map((grade, index) => (
                <option key={index} value={grade.label}>{grade.label}</option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div className="selected-course-info bg-gray-50 p-6 rounded-md shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Assessment for {selectedGrade}</h3>
              <div className="mb-4 space-y-4">
                {extendedDetails.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-800 leading-relaxed whitespace-pre-wrap">{para}</p>
                ))}
              </div>
              {testLink && (
                <p>🖌️ <a href={testLink} target="_blank" rel="noreferrer" className="text-indigo-600 underline">Click here to take the assessment test</a></p>
              )}
            </div>
          )}

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Explore Our Age-Based Art & Craft Courses</h2>
          <div className="course-grid">
            <div className="row">
              {courses.slice(0, 2).map((course, index) => (
                <div key={index} className="course-block" style={{ backgroundColor: course.color }}>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button className="read-more-btn" onClick={() => setSelectedCourseModal(course)}>📖 Read More</button>
                  <div className="course-links">
                    <a href={course.formLink} target="_blank" rel="noreferrer">📝 Registration Form</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              {courses.slice(2).map((course, index) => (
                <div key={index + 2} className="course-block" style={{ backgroundColor: course.color }}>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button className="read-more-btn" onClick={() => setSelectedCourseModal(course)}>📖 Read More</button>
                  <div className="course-links">
                    <a href={course.formLink} target="_blank" rel="noreferrer">📝 Registration Form</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedCourseModal && (
            <div className="modal-overlay" onClick={() => setSelectedCourseModal(null)}>
              <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-indigo-800 mb-4">{selectedCourseModal.title}</h2>
                <div className="modal-description space-y-4 text-gray-800 leading-relaxed">
                  {extendedDescriptions[selectedCourseModal.title]?.trim().split('\n\n').map((para, i) => (
                    <p key={i} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, (_, boldText) => `<span class='highlight-keyword'>${boldText}</span>`) }} />
                  ))}
                </div>
                <button className="close-modal absolute top-4 right-4 text-xl font-bold text-red-500 hover:text-red-700" onClick={() => setSelectedCourseModal(null)}>
                  ✖ Close
                </button>
              </div>
            </div>
          )}

          <div className="bg-white border-l-4 border-indigo-400 mt-6 p-6 rounded-lg shadow-sm">
            <p className="text-md text-gray-700">💬 Questions? Reach out anytime via <a className="text-indigo-600 underline" href="mailto:info@luminolearn.ca">email</a> or <a className="text-indigo-600 underline" href="https://wa.me/yourwhatsapplink" target="_blank" rel="noreferrer">WhatsApp</a>.</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ArtAndCraft;
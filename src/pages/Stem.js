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
      description: "Our Early Learners program offers a playful, sensory-rich introduction to STEM for children ages 3–5. Through guided discovery and hands-on activities, young learners build essential skills in a safe, nurturing space where imagination leads the way.",
      color: "#ffb6b9",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6"
    },
    {
      title: "Primary Learners (Ages 6–8)",
      description: "This stage nurtures growing minds with hands-on STEM challenges that build logical thinking and early problem-solving skills. Students explore patterns, measurements, and simple coding while investigating the world around them through fun science experiments and basic engineering tasks. It’s a playful, structured foundation that sparks curiosity and confidence.",
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
    <>
      <div className="course-page px-4 md:px-10 py-12 max-w-5xl mx-auto bg-white rounded-xl shadow-md">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center tracking-tight">
          STEM Pathways – Course Registration
        </h1>

        <p className="welcome-subtext text-lg md:text-xl text-gray-900 leading-relaxed mb-4">
          Every learner begins a <span className="text-pink-600 font-semibold">customized journey</span> — 
          one that’s <span className="text-indigo-600 font-semibold">AI-powered</span>, 
          <span className="text-purple-600 font-semibold">educator-guided</span>, and 
          <span className="text-yellow-500 font-semibold">creatively fueled</span> across  
          <span className="text-blue-600 font-semibold"> STEM</span>, 
          <span className="text-yellow-600 font-semibold"> Art & Craft</span>, 
          <span className="text-green-600 font-semibold"> Science</span>, and 
          <span className="text-red-500 font-semibold"> Language</span>.
        </p>

        <p className="welcome-subtext text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          With <span className="text-indigo-500 font-medium">critical thinking</span> as their compass, 
          <span className="text-pink-500 font-medium">creative expression</span> as their voice, and 
          <span className="text-emerald-600 font-medium">real-world impact</span> as their goal — 
          our students don’t just follow the path — 
          <span className="font-bold text-indigo-700">they illuminate it</span>.
        </p>

        <p className="welcome-subtext text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          At <span className="text-indigo-600 font-semibold">LuminoLearn</span>, our STEM curriculum is crafted for learners aged 3–17, 
          equipping them with <span className="text-yellow-600 font-medium">future-ready skills</span> through 
          fun, structured, and developmentally appropriate programs.
        </p>

        <div className="bg-indigo-50 p-6 rounded-lg shadow border-l-4 border-indigo-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">🛠️ How Registration Works</h3>
          <ol className="list-decimal list-inside text-gray-800 space-y-2">
            <li><strong>Create an Account:</strong> Sign up to unlock the registration and assessment forms.</li>
            <li><strong>Complete the Assessment:</strong> After logging in, access the personalized grade-level assessment form.</li>
            <li><strong>Review & Feedback:</strong> Within 48 hours, our educators will review results and generate feedback outlining your child’s knowledge level, learning style, and educational fit.</li>
            <li><strong>Schedule a Consultation:</strong> Meet with our team to align goals and customize your child’s educational path.</li>
            <li><strong>Finalize Registration:</strong> Review courses and complete the enrollment process.</li>
          </ol>
        </div>

        <div className="bg-white border-l-4 border-emerald-400 mt-6 p-6 rounded-lg shadow-sm">
          <p className="text-md text-gray-700 mb-2">
            🧠 This assessment helps us understand how your child learns and where they currently stand. It includes personalized insights to support both academic progress and cognitive growth.
          </p>
          <p className="text-md text-gray-700 mb-2">
            📅 You’ll be invited to schedule a 1:1 consultation where we’ll walk through the results and help choose the best-fit course.
          </p>
          <p className="text-md text-gray-700">
            💬 Questions? Our team is available 24/7 via <a className="text-green-600 underline" href="mailto:info@luminolearn.ca">email</a> or <a className="text-green-600 underline" href="https://wa.me/yourwhatsapplink" target="_blank" rel="noreferrer">WhatsApp</a>.
          </p>
        </div>

        {!isLoggedIn && (
          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-sm border-l-4 border-indigo-400">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Begin?</h3>
            <p className="welcome-subtext text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              To access the assessment test and register for your personalized course, please create your account first.
            </p>
            <button
              onClick={handleRedirectToSignup}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium transition"
            >
              Create Account
            </button>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <>
          <div className="grade-selector my-6 px-4">
            <label htmlFor="grade-select" className="block mb-2 text-lg font-semibold text-gray-800">
              Choose Your Grade:
            </label>
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Assessment for {selectedGrade}
              </h3>
              <p className="mb-4">{extendedDetails}</p>
              <div className="assessment-note text-gray-700 mb-3">
                <p><strong>Why This Assessment?</strong> This comprehensive assessment helps us evaluate the learner’s current knowledge level and ensure appropriate course placement. Assessment results are stored for 7 days only and cannot be recovered once expired.</p>
              </div>
              {testLink && (
                <p>
                  🧪{' '}
                  <a href={testLink} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                    Click here to take the assessment test
                  </a>
                </p>
              )}
            </div>
          )}
        </>
      )}

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Explore Our Age-Based STEM Courses</h2>
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
    </>
  );
}

export default Stem;
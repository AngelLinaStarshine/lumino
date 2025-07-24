import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import scienceDescriptions from './scienceDescriptions';

function Science() {
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
  const extendedDetails = selectedCourse ? scienceDescriptions[selectedCourse.title] || '' : '';

  return (
    <div className="course-page px-4 md:px-10 py-12 max-w-5xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center tracking-tight">
        Science & Geography – Course Registration
      </h1>

      <p className="custom-welcome">At LuminoLearn, we believe <span className="green font-bold">curiosity is a compass</span> — and science is the map. Every learner embarks on a <span className="pink">personal discovery journey</span>, guided by passionate <span className="purple">educators</span> and enriched with <span className="yellow">real-world inquiry</span>.</p>

      <p className="custom-welcome">Our Science & Geography curriculum is designed to foster <span className="indigo">systems thinking</span>, <span className="blue">environmental awareness</span>, and <span className="green">global understanding</span>. Students explore Earth's wonders — from water cycles to weather systems, ecosystems to ethical geography — all while building scientific literacy.</p>

      <div className="mt-10 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
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
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Begin?</h3>
          <p className="text-lg text-gray-700 mb-4">To access the assessment test and register for your personalized course, please create your account first.</p>
          <button onClick={handleRedirectToSignup} className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white text-lg font-medium transition">Create Account</button>
        </div>
      )}

      {isLoggedIn && (
        <>
          <div className="grade-selector my-6 px-4">
            <label htmlFor="grade-select" className="block mb-2 text-lg font-semibold text-gray-800">Choose Your Grade:</label>
            <select id="grade-select" onChange={(e) => setSelectedGrade(e.target.value)} defaultValue="" className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md">
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
              <div className="assessment-note text-gray-700 mb-3">
                <p><strong>Why This Assessment?</strong> This evaluation helps us understand your learner’s current understanding and interests. Results are retained for 7 days only and cannot be recovered afterward.</p>
              </div>
              {testLink && (
                <p>🌍 <a href={testLink} target="_blank" rel="noreferrer" className="text-green-600 underline">Click here to take the assessment test</a></p>
              )}
            </div>
          )}
        </>
      )}

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Explore Our Age-Based Science & Geography Courses</h2>
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
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-green-800 mb-4">{selectedCourseModal.title}</h2>
            <div className="modal-description space-y-4 text-gray-800 leading-relaxed">
              {scienceDescriptions[selectedCourseModal.title]?.trim().split('\n\n').map((para, i) => (
                <p key={i} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, (_, boldText) => `<span class='highlight-keyword'>${boldText}</span>`) }} />
              ))}
            </div>
            <button className="close-modal absolute top-4 right-4 text-xl font-bold text-red-500 hover:text-red-700" onClick={() => setSelectedCourseModal(null)}>
              ✖ Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border-l-4 border-emerald-400 mt-6 p-6 rounded-lg shadow-sm">
        <p className="text-md text-gray-700">💬 Questions? Our team is available 24/7 via <a className="text-green-600 underline" href="mailto:info@luminolearn.ca">email</a> or <a className="text-green-600 underline" href="https://wa.me/yourwhatsapplink" target="_blank" rel="noreferrer">WhatsApp</a>.</p>
      </div>
    </div>
  );
}

export default Science;

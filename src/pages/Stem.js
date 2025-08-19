
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import thinkImg from '../assets/think.png';   // If using /public, remove this import and use src="/think.png"
import btnReg  from '../assets/btn_reg.png'; // Button image

export default function LanguageAndLiterature() {
  const tiles = [
    { title: 'Explorers (3–5)',    topics: ['Shapes', 'Patterns', 'Seasons', 'Animal', 'Worlds'],         formLink: 'https://forms.gle/EAxVGZartfL7CJKL6', to: '/stem' },
    { title: 'Builders (6–8)',     topics: ['Number logic', 'Earth science', 'Experiments'],               formLink: 'https://forms.gle/nmskVUnXWjhz2TV18',  to: '/art-and-craft' },
    { title: 'Thinkers (9–11)',    topics: ['Geometry', 'Forces', 'Historical timelines'],                 formLink: 'https://forms.gle/7dToZW1wFbHrgbyt7',  to: '/language-and-literature' },
    { title: 'Analysts (12–14)',   topics: ['Algebra', 'Chemistry', 'Global systems'],                     formLink: 'https://forms.gle/idAivrySZrDrT8Vb9',  to: '/science' },
    { title: 'Innovators (15–18)', topics: ['Research', 'Calculus', 'Labs', 'Theory-to-practice'],         formLink: 'https://forms.gle/utPVf1p1KAVycG1H7',  to: '/language-and-literature' },
  ];

  const open = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleKey = useCallback((e, url) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open(url);
    }
  }, [open]);

  return (
    <div style={{ width: '100%', background: 'transparent' }}>
      <style>{`
        :root {
          --orange-1: #ff7a00;
          --orange-2: #ff7a00;
          --ink: #111111;
          --text: #111827;
        }

        /* Full-bleed utility */
        .full-bleed {
          width: 100vw;
          margin-left: 50%;
          transform: translateX(-50%);
        }

        /* Hero with overlay title on top of the image */
        .hero {
          position: relative;
          width: 100%;
        }
        .hero-img {
          width: 100%;
          height: 22rem;
          object-fit: cover;
          display: block;
        }
     

        /* Quote below hero (not full-bleed to keep readable line length) */
        .quote {
          text-align: center;
          font-style: italic;
          color: #374151;
          margin: .9rem auto 2rem;
          max-width: 9150px;
          line-height: 1.6;
          font-size: 2.1rem;
        }
        .quote b {
          display: block;
          margin-top: .35rem;
          font-weight: 700;
          font-style: normal;
          color: var(--ink);
        }

        /* 5 columns across the full screen width */
        .tiles-band.full-bleed { padding: 16px 20px 28px; }
        .tiles-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr)); /* exactly 5 columns */
          gap: 24px;
          align-items: stretch;
        }

        /* Taller orange tiles */
        .tile {
          border-radius: 18px;
          color: #fff;
          text-align: center;
          min-height: 400px; /* ← Taller blocks; tweak as needed */
          background-image:
            radial-gradient(1200px 400px at -20% -40%, rgba(255,255,255,0.15), rgba(255,255,255,0) 60%),
            linear-gradient(135deg, var(--orange-1), var(--orange-2));
          box-shadow: 0 10px 22px rgba(0,0,0,0.12);
          transition: transform .25s ease, box-shadow .25s ease, filter .25s ease;
          outline: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 22px;
        }
        .tile:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 16px 36px rgba(0,0,0,0.18); filter: saturate(1.05); }
        .tile:active { transform: translateY(-2px) scale(0.995); }
        .tile:focus-visible { outline: 3px solid rgba(255, 122, 0, .4); outline-offset: 4px; }

        .tile-title {
          color: black;
          letter-spacing: .2px;
          font-size: 30px;
          margin: 0 0 12px 0;
          text-shadow: 0 1px 0 rgba(0,0,0,.06);
        }

        .topics {
          background: linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.05));
          border-radius: 14px;
          padding: 12px;
          width: 100%;
          margin-top: 6px;
          flex: 1; /* take remaining height so button sticks to bottom */
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
        }
            .chip {
          display: inline-block;
          font-size: 32px;
          padding: 6px 10px;
       
          color: #1f2937;
       border-radius: 15px;
          user-select: none;
        
          transition: transform .15s ease, background .15s ease;
          user-select: none;
        }
            .chip:hover { background: #fbb884ff; transform: translateY(-1px); }
        /* Full-width image button INSIDE each tile */
        .btn-img {
          width: 100%;
          height: 120px; /* a bit taller to feel substantial */
        font-size: 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: black;
        
          letter-spacing: .12px;
          position: relative;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        
          transition: transform .2s ease, box-shadow .2s ease, filter .2s ease;
          margin-top: 16px; /* sits at the bottom due to .topics flex:1 */
        }
        .btn-img:hover { transform: translateY(-2px);  filter: saturate(1.06); }
        .btn-img:active { transform: translateY(0); }
        .btn-img:focus-visible { outline: 3px solid rgba(0,0,0,.35); outline-offset: 3px; }

        .btn-text {
          position: relative;
          z-index: 1;
          text-shadow: 0 1px 2px rgba(0,0,0,.25);
        }

        /* Horizontal scroll fallback if a parent container constrains width too much */
        @media (max-width: 1100px) {
          .tiles-grid {
            grid-template-columns: repeat(5, 260px); /* keep 5 columns; allow side scroll */
            overflow-x: auto;
          }
        }
      `}</style>

      {/* Full-bleed hero with overlay title */}
      <header className="hero full-bleed" aria-label="Thinking and Discovery">
        <img src={thinkImg} alt="Curiosity and Learning" className="hero-img" />
       
      </header>
<br></br>
      {/* Quote */}
      <p className="quote">
        “The important thing is not to stop questioning. Curiosity has its own reason for existing.”
        <b>– Albert Einstein</b>
      </p>

      {/* Five taller blocks spanning the entire screen width */}
      <section className="tiles-band full-bleed">
        <div className="tiles-grid" role="list">
          {tiles.map((t, i) => (
            <div
              key={i}
              className="tile"
              role="listitem"
              tabIndex={0}
              aria-label={`${t.title} — Open registration form`}
              onClick={() => open(t.formLink)}
              onKeyDown={(e) => handleKey(e, t.formLink)}
            >
              <h3 className="tile-title">{t.title}</h3>

              <div className="topics" aria-label="Topics">
                {t.topics.map((topic, idx) => (
                  <span key={idx} className="chip">{topic}</span>
                ))}
              </div>

              {/* REGISTER button inside each tile, full width */}
              <Link
                to={t.to}
                className="btn-img"
                aria-label={`Register online for ${t.title}`}
                style={{ backgroundImage: `url(${btnReg})` }}
                onClick={(e) => e.stopPropagation()} /* keep tile click from hijacking the Link */
              >
                <span className="btn-text">REGISTER</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}



/*import '../pages/Courses.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import extendedDescriptions from './extendedDescriptions';
import stemImg from '../assets/stem.png';
import stemImg1 from '../assets/stem1.png';
import stemImg2 from '../assets/stem2.png';
import stemImg3 from '../assets/stem3.png';
import stemImg5 from '../assets/stem5.png';
function Stem() {
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
    description: "Our Early Learners program offers a playful, sensory-rich introduction to STEM for children ages 3–5...",
    color: "#ed98c5ff",
    formLink: "https://forms.gle/EAxVGZartfL7CJKL6",
    image: stemImg
  },
    {
      title: "Primary Learners (Ages 6–8)",
      description: "This stage nurtures growing minds with hands-on STEM challenges that build logical thinking and early problem-solving skills. Students explore patterns, measurements, and simple coding while investigating the world around them through fun science experiments and basic engineering tasks. It’s a playful, structured foundation that sparks curiosity and confidence.",
      color: "#f9971d",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18",
        image: stemImg1
    },
    {
      title: "Intermediate Learners (Ages 9–11)",
      description: "Enhance STEM foundations with collaborative experiments and problem-solving challenges.",
      color: "#7DCFB6",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7",
        image: stemImg2
    },
    {
      title: "Emerging Teens (Ages 12–14)",
      description: "Dive into coding, electronics, and ethical technology use.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9",
        image: stemImg3
    },
    {
      title: "Future Pathways (Ages 15–17)",
      description: "Explore AI, cybersecurity, and future-ready STEM applications.",
      color: "#0571d3",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7",
       image: stemImg5
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
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center tracking-tight">
        STEM – Course Registration
      </h1>

     <p class="custom-welcome">
    Every learner begins a <span class="pink"> customized journey</span> — 
    guided by caring <span class="purple">educators</span>, supported in their 
    <span class="green"> individual strengths</span>, and encouraged to become more 
    <span class="indigo"> independent thinkers</span>.
  </p>

  <p class="custom-welcome">
    We teach students to use 
    <span class="blue"> AI as a creative tool</span>, not a leader — integrating it meaningfully into their explorations of 
    <span class="blue"> STEM</span>, <span class="yellow"> Art & Craft</span>, 
    <span class="green"> Science</span>, and <span class="red"> Language</span>.
  </p>

  <p class="custom-welcome">
    With <span class="indigo">critical thinking</span> as their compass, 
    <span class="pink">creative expression</span> as their voice, and 
    <span class="green">real-world impact</span> as their goal — 
    our students don’t just follow the path — 
    <span class="indigo font-bold">they illuminate it</span>.
  </p>

  <p class="custom-welcome">
    At <span class="indigo font-semibold">LuminoLearn</span>, our STEM curriculum is crafted for learners aged 3–17, 
    equipping them with <span class="yellow">future-ready skills</span> through 
    fun, structured, and developmentally appropriate programs.
  </p>
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
      </div>

      {!isLoggedIn && (
        <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Begin?</h3>
          <p className="text-lg text-gray-700 mb-4">To access the assessment test and register for your personalized course, please create your account first.</p>
          <button onClick={handleRedirectToSignup} className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium transition">Create Account</button>
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
                <p>🔬 <a href={testLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">Click here to take the assessment test</a></p>
              )}
            </div>
          )}
        </>
      )}

      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Explore Our Age-Based STEM Courses</h2>
      <div className="course-grid">
        <div className="row">
          {courses.slice(0, 2).map((course, index) => (
       <div key={index + 2} className="course-block flex items-center space-x-4 p-4" style={{ backgroundColor: course.color }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
                  {course.image && (
                    <img src={course.image} alt={course.title}   className="course-imagecircle rounded-full mx-auto my-4 w-28 h-28 object-cover"/>
                    
                  )}
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
            <h2 className="text-2xl font-bold text-blue-800 mb-4">{selectedCourseModal.title}</h2>
            <div className="modal-description space-y-4 text-gray-800 leading-relaxed">
              {extendedDescriptions[selectedCourseModal.title]?.trim().split('\n\n').map((para, i) => (
                <p key={i} className="whitespace-pre-wrap">{para}</p>
              ))}
            </div>
            <button className="close-modal absolute top-4 right-4 text-xl font-bold text-red-500 hover:text-red-700" onClick={() => setSelectedCourseModal(null)}>
              ✖ Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border-l-4 border-emerald-400 mt-6 p-6 rounded-lg shadow-sm">
        <p className="text-md text-gray-700">💬 Questions? Our team is available 24/7 via <a className="text-blue-600 underline" href="mailto:info@luminolearn.ca">email</a> or <a className="text-blue-600 underline" href="https://wa.me/yourwhatsapplink" target="_blank" rel="noreferrer">WhatsApp</a>.</p>
      </div>
    </div>
  );
}

export default Stem;*/

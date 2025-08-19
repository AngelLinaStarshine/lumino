import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import thinkImg from '../assets/express.png';   // If using /public, remove this import and use src="/think.png"
import btnReg  from '../assets/btn_reg.png'; // Button image

export default function LanguageAndLiterature() {
  const tiles = [
    {
      title: 'Explorers (3–5)',
      topics: ['Vocabulary games', 'Storytelling'],
      formLink: 'https://forms.gle/EAxVGZartfL7CJKL6',
      to: '/stem',
    },
    {
      title: 'Builders (6–8)',
      topics: ['Sentence creation', 'Expressive reading'],
      formLink: 'https://forms.gle/nmskVUnXWjhz2TV18',
      to: '/art-and-craft',
    },
    {
      title: 'Thinkers (9–11)',
      topics: ['Essay structure', 'Oral presentations'],
      formLink: 'https://forms.gle/7dToZW1wFbHrgbyt7',
      to: '/language-and-literature',
    },
    {
      title: 'Analysts (12–14)',
      topics: ['Argumentation', 'Speech writing', 'Journalism'],
      formLink: 'https://forms.gle/idAivrySZrDrT8Vb9',
      to: '/science',
    },
    {
      title: 'Innovators (15–18)',
      topics: ['TED-style talks', 'Cultural literature'],
      formLink: 'https://forms.gle/utPVf1p1KAVycG1H7',
      to: '/language-and-literature',
    },
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
          --orange-1: #dab9e5eb;
          --orange-2: #c260d7ff;
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
        .hero-title {
          position: absolute;
          left: 50%;
          top: 14%;
          transform: translateX(-50%);
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900;
          color: #ffffff;
          letter-spacing: .4px;
          text-align: center;
          padding: .35rem .9rem;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(0,0,0,.45), rgba(0,0,0,.25));
          text-shadow: 0 2px 6px rgba(0,0,0,.35);
          backdrop-filter: blur(2px);
          pointer-events: none;
        }

        /* Quote below hero */
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
          min-height: 420px; /* taller blocks */
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
          color: #0f172a; /* slate-900 for strong contrast on orange */
          letter-spacing: .2px;
          font-size: 30px;
          margin: 0 0 12px 0;
          text-shadow: 0 1px 0 rgba(255,255,255,.25);
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
        }
        .chip:hover { background: #feadfeff; transform: translateY(-1px); }

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
          text-shadow: 0 1px 2px rgba(255,255,255,.2);
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
      <header className="hero full-bleed" aria-label="Expression & Communication">
        <img src={thinkImg} alt="Expression & Communication" className="hero-img" />
      
      </header>

      {/* Quote */}
      <p className="quote">
        “To speak a language is to take on a world, a culture.”
        <b>– Frantz Fanon</b>
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
                <span className="btn-text">Register</span>
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
                    <p key={i} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*//*g, (_, boldText) => `<span class='highlight-keyword'>${boldText}</span>`) }} />
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

export default ArtAndCraft;*/
import '../pages/Courses.css';

function LanguageAndLiterature() {
  const courses = [
    {
      title: "Early Readers / Ages 3–5",
      description: "Phonics, rhymes, and early word recognition to nurture a love for books.",
      color: "#f4d35e",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6",
      testLink: "#"
    },
    {
      title: "Primary Language / Ages 6–8",
      description: "Explore basic grammar, storytelling, and reading fluency through engaging activities.",
      color: "#7dcfb6",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18",
      testLink: "#"
    },
    {
      title: "Literary Explorers / Ages 9–11",
      description: "Dive into short stories, reading comprehension, and writing fundamentals.",
      color: "#f9971d",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7",
      testLink: "#"
    },
    {
      title: "Emerging Writers / Ages 12–14",
      description: "Sharpen creative and academic writing skills, from essays to poetry.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9",
      testLink: "#"
    },
    {
      title: "Language & Society / Ages 15–17",
      description: "Study classical literature, critical analysis, debate, and language for global use.",
      color: "#0571d3",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7",
      testLink: "#"
    }
  ];

  return (
    <div className="course-page">
      <h1>Languages and Literature</h1>
      <p>
        Welcome to our Languages and Literature courses. From early reading to critical analysis,
        we nurture confident readers, thoughtful writers, and global communicators.
      </p>
      <h2>Select a Course Below</h2>

      <div className="course-grid">
        <div className="row">
          {courses.slice(0, 2).map((course, index) => (
            <div key={index} className="course-block" style={{ backgroundColor: course.color }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-links">
                <a href={course.formLink} target="_blank" rel="noreferrer">Fill Registration Form</a>
                <a href={course.testLink} target="_blank" rel="noreferrer">Take Entry Assessment (Coming Soon)</a>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          {courses.slice(2).map((course, index) => (
            <div key={index + 2} className="course-block" style={{ backgroundColor: course.color }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-links">
                <a href={course.formLink} target="_blank" rel="noreferrer">Fill Registration Form</a>
                <a href={course.testLink} target="_blank" rel="noreferrer">Take Entry Assessment (Coming Soon)</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanguageAndLiterature;

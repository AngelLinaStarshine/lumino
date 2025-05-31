import '../pages/Courses.css';

function Science() {
  const courses = [
    {
      title: "Early Learners / Ages 3–5",
      description: "Explore science and nature through sensory-based experiments and play-based discovery.",
      color: "#ffb6b9",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6",
      testLink: "#"
    },
    {
      title: "Primary Learners / Ages 6–8",
      description: "Beginner science and geography exploration through maps, plants, weather and ecosystems.",
      color: "#f9971d",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18",
      testLink: "#"
    },
    {
      title: "Intermediate Learners / Ages 9–11",
      description: "Hands-on projects to investigate life, earth, and physical science topics in more depth.",
      color: "#7DCFB6",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7",
      testLink: "#"
    },
    {
      title: "Emerging Teens / Ages 12–14",
      description: "Build critical thinking through inquiry-based labs and global geography case studies.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9",
      testLink: "#"
    },
    {
      title: "Future Pathways / Ages 15–17",
      description: "Deep dive into applied sciences, sustainability, environmental issues, and climate strategy.",
      color: "#0571d3",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7",
      testLink: "#"
    }
  ];

  return (
    <div className="course-page">
      <h1>Science & Geography Registration</h1>
      <p>
        Welcome to our Science and Geography courses. Engage in curiosity-driven experiments,
        geography explorations, and real-world environmental problem-solving!
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

export default Science;

import '../pages/Courses.css';

function Stem() {
  const courses = [
    {
      title: "Early Learners/3-5",
      description: "Fun, sensory-based STEM activities for young minds to explore and grow.",
      color: "#ffb6b9",
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6",
      testLink: "#"
    },
    {
      title: "Primary Learners/6-8",
      description: "Introduce young learners to the world of science, numbers, and basic engineering.",
      color: "#f9971d",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18",
      testLink: "#"
    },
    {
      title: "Intermediate Learners/9-11",
      description: "Enhance STEM foundations with collaborative projects and problem-solving challenges.",
      color: "#7DCFB6",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7",
      testLink: "#"
    },
  
    {
      title: "Emerging Teens/12-14",
      description: "Dive deeper into coding, robotics, and scientific inquiry for future innovators.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9",
      testLink: "#"
    },
    {
      title: "Future Pathways/15-17",
      description: "Explore tech careers, advanced logic, and future-ready STEM applications.",
      color: "#0571d3",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7",
      testLink: "#"
    }
  
  ];

  return (
    <div className="course-page">
      <h1>STEM Registration</h1>
      <p>Explore our STEM courses and ignite curiosity in science, tech, engineering, and math.</p>
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

export default Stem;

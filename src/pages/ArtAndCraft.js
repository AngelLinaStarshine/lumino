import '../pages/Courses.css';

function ArtAndCraft() {
  const courses = [
    {
      title: "Creative Starters / Ages 3–5",
      description: "Hands-on sensory art play: colors, textures, shapes and safe craft tools.",
      color: "#f6c0d0", // soft pink
      formLink: "https://forms.gle/EAxVGZartfL7CJKL6",
      testLink: "#"
    },
    {
      title: "Mini Makers / Ages 6–8",
      description: "Painting, cutting, folding, and gluing: creative exercises and guided imagination.",
      color: "#f9971d",
      formLink: "https://forms.gle/nmskVUnXWjhz2TV18",
      testLink: "#"
    },
    {
      title: "Young Designers / Ages 9–11",
      description: "Learn about color theory, basic design, mixed media, and create personal portfolios.",
      color: "#7DCFB6",
      formLink: "https://forms.gle/7dToZW1wFbHrgbyt7",
      testLink: "#"
    },
    {
      title: "Teen Creators / Ages 12–14",
      description: "Master techniques like shading, perspective, and sculpture using real artist tools.",
      color: "#d9b8f3",
      formLink: "https://forms.gle/idAivrySZrDrT8Vb9",
      testLink: "#"
    },
    {
      title: "Portfolio Prep / Ages 15–17",
      description: "Build portfolios for college, learn digital art, and exhibit personal masterpieces.",
      color: "#0571d3",
      formLink: "https://forms.gle/utPVf1p1KAVycG1H7",
      testLink: "#"
    }
  ];

  return (
    <div className="course-page">
      <h1>Art & Craft Registration</h1>
      <p>
        Welcome to our Art & Craft courses where creative expression meets skill-building.
        Explore drawing, painting, mixed media, sculpture, and more!
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

export default ArtAndCraft;

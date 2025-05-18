// src/pages/Stem.js
import rectangleShape from '../assets/rectangle-design1.jpg'; 
import rectangleShape1 from '../assets/rectangle-design2.jpg'; 
import rectangleShape2 from '../assets/rectangle-design3.jpg'; 
import '../pages/Courses.css';


function Stem() {

  return (
    <div className="course-page">
     
      <h1>STEM Registration</h1>
      <p>
        Welcome to our STEM course where you can explore science, technology, engineering,
        and mathematics. Enhance your analytical and problem-solving skills with our hands-on curriculum.
      </p>
      <h2>Please choose the course from below</h2>
      <div className="decorative-rectangle">
      <img src={rectangleShape} alt="Decorative rectangle" />
      <img src={rectangleShape1} alt="Decorative rectangle" />
      <img src={rectangleShape2} alt="Decorative rectangle" />
      <img src={rectangleShape} alt="Decorative rectangle" />
      <img src={rectangleShape1} alt="Decorative rectangle" />
      <img src={rectangleShape2} alt="Decorative rectangle" />
      <img src={rectangleShape} alt="Decorative rectangle" />
      <img src={rectangleShape1} alt="Decorative rectangle" />
      <img src={rectangleShape2} alt="Decorative rectangle" />
      <img src={rectangleShape} alt="Decorative rectangle" />
      <img src={rectangleShape1} alt="Decorative rectangle" />
      <img src={rectangleShape2} alt="Decorative rectangle" />
      </div>

 
    
 
    </div>
  );
}

export default Stem;

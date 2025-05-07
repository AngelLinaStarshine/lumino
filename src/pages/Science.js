// src/pages/Stem.js
import rectangleShape from '../assets/rectangle-design1.jpg'; 
import rectangleShape1 from '../assets/rectangle-design2.jpg'; 
import rectangleShape2 from '../assets/rectangle-design3.jpg'; 
import '../pages/Courses.css';
import Footer from '../components/Footer';

function Stem() {

  return (
    <div className="course-page">

      <h1>Science Registration</h1>
      <p>
        Welcome to our Science and Geography courses where you can explore science, 
      </p>
      <h2>Please choose the course from below</h2>
      <div className="decorative-rectangle">
      
      <img src={rectangleShape1} alt="Decorative rectangle" />
      <img src={rectangleShape} alt="Decorative rectangle" />
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

  
      <Footer />

 
    </div>
  );
}

export default Stem;

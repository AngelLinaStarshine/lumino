// src/pages/Stem.js
import rectangleShape from '../assets/rectangle-design1.jpg'; 
import rectangleShape1 from '../assets/rectangle-design2.jpg'; 
import rectangleShape2 from '../assets/rectangle-design3.jpg'; 
import '../pages/Courses.css';
import Navbar from '../components/Navbar';

import RegisterForm from '../pages/RegisterForm';

function Stem() {

  return (
    <div className="course-page">
      <Navbar />
      <h1>ART and Craft</h1>
      <p>
        Welcome to our ART and Craft courses where you can explore science, 
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

      <RegisterForm />

 
    </div>
  );
}

export default Stem;

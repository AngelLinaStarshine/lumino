import React from 'react';
import { Link } from 'react-router-dom';

function CoursesCard({ title, image }) {
  return (
    <div className="course-card">
      <img src={image} alt={title} className="course-image" />
      <h3>{title}</h3>
 
      <Link to="/register" className="enroll-btn">REGISTER ONLINE</Link>
    </div>
  );
}

export default CoursesCard;

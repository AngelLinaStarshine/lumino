import React from 'react';
import '../App.css'; 
import fbIcon from '../assets/fb.png';
import whatsappIcon from '../assets/phone.png';
import instagramIcon from '../assets/insta.png';
import linkedinIcon from '../assets/linkedin.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-media-links">
      <a href="https://www.linkedin.com/company/lumino-learn-academy/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon linkedin-icon" />
        </a>
        <a href="https://www.facebook.com/luminolearn.academy" target="_blank" rel="noopener noreferrer">
          <img src={fbIcon} alt="Facebook" className="social-icon" />
        </a>
        <a
  href="https://wa.me/14374241380"
  target="_blank"
  rel="noopener noreferrer"
>
  <img src={whatsappIcon} alt="Whatsapp" className="social-icon" />
</a>

        <a href="https://www.instagram.com/luminolearn.academy?igsh=b2w5MGdiaHZuemNn&utm_source=qr" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" className="social-icon" />
        </a>
      </div>
      <p>© 2025 LuminoLearn Academy. </p><p>All rights reserved.</p>
    </footer>
  );
};

export default Footer;

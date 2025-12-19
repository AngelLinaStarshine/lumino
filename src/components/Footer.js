import React from 'react';
import '../App.css';

import fbIcon from '../assets/fb.png';
import whatsappIcon from '../assets/phone.png';
import instagramIcon from '../assets/insta.png';
import linkedinIcon from '../assets/linkedin.png';

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/lumino-learn-academy/posts/?feedView=all",
    icon: linkedinIcon,
    alt: "LinkedIn",
    className: "linkedin-icon"
  },
  {
    href: "https://www.facebook.com/luminolearn.academy",
    icon: fbIcon,
    alt: "Facebook"
  },
  {
    href: "https://wa.me/14374241380",
    icon: whatsappIcon,
    alt: "WhatsApp"
  },
  {
    href: "https://www.instagram.com/luminolearn.academy?igsh=b2w5MGdiaHZuemNn&utm_source=qr",
    icon: instagramIcon,
    alt: "Instagram"
  }
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-media-links">
        {socialLinks.map((item, index) => (
          <a key={index} href={item.href} target="_blank" rel="noopener noreferrer">
            <img src={item.icon} alt={item.alt} className={`social-icon ${item.className || ''}`} />
          </a>
        ))}
      </div>

      <p>© {new Date().getFullYear()} LuminoLearn Academy. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

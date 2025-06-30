import React, { useEffect, useState } from 'react';
import './PersonalAccount.css';

function PersonalAccount() {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [moodleCourses, setMoodleCourses] = useState([]);
  const [moodleUser, setMoodleUser] = useState(null);
  const [loadingMoodle, setLoadingMoodle] = useState(true);

  // Fetch user + Moodle info
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    setUser(storedUser);

    if (storedUser?.email) {
      fetch(`http://localhost:5000/api/moodle/user-courses/${storedUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.user && data?.courses) {
            setMoodleUser(data.user);
            setMoodleCourses(data.courses);
          }
        })
        .catch((err) => console.error('Moodle fetch error:', err))
        .finally(() => setLoadingMoodle(false));
    } else {
      setLoadingMoodle(false);
    }
  }, []);

  // Load Calendly script once
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const toggleSection = (section) => {
    setExpanded((prev) => (prev === section ? null : section));
  };

  if (!user) return <p className="loading">Loading your account...</p>;

  return (
    <div className="personal-account">
      <h2 className="welcome">
        Welcome, {user.firstName} {user.lastName}
      </h2>

      {/* My Info */}
      <div className="account-section">
        <button onClick={() => toggleSection('info')} className="section-toggle">
          My Information
        </button>
        {expanded === 'info' && (
          <div className="section-content">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Subscription:</strong> {user.subscription}</p>
            {moodleUser && (
              <>
                <hr />
                <p><strong>Moodle ID:</strong> {moodleUser.id}</p>
                <p><strong>Username:</strong> {moodleUser.username}</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Courses */}
      <div className="account-section">
        <button onClick={() => toggleSection('courses')} className="section-toggle">
          Enrolled Courses
        </button>
        {expanded === 'courses' && (
          <div className="section-content">
            {loadingMoodle ? (
              <p>Loading Moodle courses...</p>
            ) : moodleCourses.length > 0 ? (
              <ul>
                {moodleCourses.map((course, i) => (
                  <li key={course.id || i}>
                    <p><strong>{course.fullname}</strong></p>
                    {course.courseimage && (
                      <img
                        src={course.courseimage}
                        alt={`${course.fullname} course`}
                        style={{ width: '100%', maxWidth: '300px', borderRadius: '10px' }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Moodle courses found.</p>
            )}
          </div>
        )}
      </div>

      {/* Payments */}
      <div className="account-section">
        <button onClick={() => toggleSection('payments')} className="section-toggle">
          Payment History
        </button>
        {expanded === 'payments' && (
          <div className="section-content">
            {user.paymentHistory && user.paymentHistory.length > 0 ? (
              <ul>
                {user.paymentHistory.map((payment, i) => (
                  <li key={i}>{payment.date} - {payment.amount} - {payment.status}</li>
                ))}
              </ul>
            ) : (
              <p>No payment history found.</p>
            )}
          </div>
        )}
      </div>

  <div className="account-section">
  <button onClick={() => toggleSection('appointment')} className="section-toggle">
    📅 Book Appointment
  </button>
  {expanded === 'appointment' && (
    <div className="section-content">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#0571d3', fontSize: '1.5rem', marginBottom: '10px' }}>
          Let's Connect!
        </h3>
        <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
          Choose a time that works best for you below. Prefer a new tab? 
          <a 
            href="https://calendly.com/lumino-luminolearn" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#f9971d',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginLeft: '6px'
            }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Click here
          </a>
        </p>
      </div>

      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/lumino-luminolearn?hide_landing_page_details=1&hide_gdpr_banner=1"
        style={{ minWidth: '320px', height: '700px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
      ></div>
    </div>
  )}
</div>


    </div>
  );
}

export default PersonalAccount;

import React, { useEffect, useState } from 'react';
import './PersonalAccount.css';

function PersonalAccount() {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState('overview');
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

  if (!user) return <p className="account-loading">Loading your account...</p>;

  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
  const subscription = user.subscription || 'No active subscription yet';
  const paymentCount = user.paymentHistory ? user.paymentHistory.length : 0;

  return (
    <div className="account-page">
      {/* Top overview hero */}
      <section className="account-hero">
        <p className="account-hero-kicker">Personal Learning Space</p>
        <h1 className="account-hero-title">
          Welcome back, <span className="account-hero-name">{fullName || 'LuminoLearn Family'}</span>
        </h1>
        <p className="account-hero-sub">
          Track courses, certificates, payment plans, and book a call — all in one calm, organized space.
        </p>

        <div className="account-hero-badges">
          <div className="hero-badge">
            <span className="hero-badge-label">Subscription</span>
            <span className="hero-badge-value">{subscription}</span>
          </div>
          <div className="hero-badge">
            <span className="hero-badge-label">Enrolled in</span>
            <span className="hero-badge-value">
              {loadingMoodle ? '…' : `${moodleCourses.length} course${moodleCourses.length === 1 ? '' : 's'}`}
            </span>
          </div>
          <div className="hero-badge">
            <span className="hero-badge-label">Payments on record</span>
            <span className="hero-badge-value">{paymentCount}</span>
          </div>
        </div>
      </section>

      {/* Main layout: left/right cards */}
      <div className="account-grid">
        {/* LEFT: Info + Courses */}
        <div className="account-column">
          {/* My Information */}
          <section className="account-card">
            <button
              onClick={() => toggleSection('info')}
              className="account-section-header"
            >
              <div>
                <span className="section-icon">👤</span>
                <span className="section-title">My Information</span>
              </div>
              <span className="section-toggle-indicator">
                {expanded === 'info' ? '−' : '+'}
              </span>
            </button>

            {expanded === 'info' && (
              <div className="account-section-body">
                <p>
                  <strong>Name:</strong> {fullName || '—'}
                </p>
                <p>
                  <strong>Email:</strong> {user.email || '—'}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone || '—'}
                </p>
                <p>
                  <strong>Subscription:</strong> {subscription}
                </p>

                {moodleUser && (
                  <>
                    <hr className="account-divider" />
                    <p className="account-moodle-meta">
                      Linked to LuminoLearn classroom:
                    </p>
                    <p>
                      <strong>Moodle ID:</strong> {moodleUser.id}
                    </p>
                    <p>
                      <strong>Username:</strong> {moodleUser.username}
                    </p>
                  </>
                )}
              </div>
            )}
          </section>

          {/* Enrolled Courses */}
          <section className="account-card">
            <button
              onClick={() => toggleSection('courses')}
              className="account-section-header"
            >
              <div>
                <span className="section-icon">📚</span>
                <span className="section-title">Enrolled Courses</span>
              </div>
              <span className="section-toggle-indicator">
                {expanded === 'courses' ? '−' : '+'}
              </span>
            </button>

            {expanded === 'courses' && (
              <div className="account-section-body">
                {loadingMoodle ? (
                  <p>Loading your Moodle courses…</p>
                ) : moodleCourses.length > 0 ? (
                  <ul className="course-list">
                    {moodleCourses.map((course, i) => (
                      <li key={course.id || i} className="course-list-item">
                        <p className="course-title">
                          {course.fullname}
                        </p>
                        {course.courseimage && (
                          <img
                            src={course.courseimage}
                            alt={`${course.fullname} course`}
                            className="course-image"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Moodle courses found yet. Once your child is enrolled in classes, they will appear here.</p>
                )}
              </div>
            )}
          </section>
        </div>

        {/* RIGHT: Payments + Appointment */}
        <div className="account-column">
          {/* Payment History */}
          <section className="account-card">
            <button
              onClick={() => toggleSection('payments')}
              className="account-section-header"
            >
              <div>
                <span className="section-icon">💳</span>
                <span className="section-title">Payment History</span>
              </div>
              <span className="section-toggle-indicator">
                {expanded === 'payments' ? '−' : '+'}
              </span>
            </button>

            {expanded === 'payments' && (
              <div className="account-section-body">
                {user.paymentHistory && user.paymentHistory.length > 0 ? (
                  <ul className="payment-list">
                    {user.paymentHistory.map((payment, i) => (
                      <li key={i} className="payment-list-item">
                        <span className="payment-date">{payment.date}</span>
                        <span className="payment-amount">{payment.amount}</span>
                        <span className={`payment-status payment-status-${(payment.status || '').toLowerCase()}`}>
                          {payment.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No payment history found yet. Once your first payment is processed, it will appear here.</p>
                )}
              </div>
            )}
          </section>

          {/* Book Appointment */}
          <section className="account-card">
            <button
              onClick={() => toggleSection('appointment')}
              className="account-section-header"
            >
              <div>
                <span className="section-icon">📅</span>
                <span className="section-title">Book Appointment</span>
              </div>
              <span className="section-toggle-indicator">
                {expanded === 'appointment' ? '−' : '+'}
              </span>
            </button>

            {expanded === 'appointment' && (
              <div className="account-section-body">
                <div className="appointment-intro">
                  <h3>Let’s Connect</h3>
                  <p>
                    Choose a time that works best for your family. Prefer a new tab?
                    <a
                      href="https://calendly.com/lumino-luminolearn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="appointment-link"
                    >
                      Click here
                    </a>
                  </p>
                </div>

                <div
                  className="calendly-inline-widget"
                  data-url="https://calendly.com/lumino-luminolearn?hide_landing_page_details=1&hide_gdpr_banner=1"
                  style={{
                    minWidth: '320px',
                    height: '650px',
                  }}
                ></div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default PersonalAccount;

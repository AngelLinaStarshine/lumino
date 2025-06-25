import React, { useEffect, useState } from 'react';
import './PersonalAccount.css';
import BookingForm from '../components/BookingForm';

function PersonalAccount() {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    setUser(storedUser);
  }, []);

  const toggleSection = (section) => {
    setExpanded(prev => (prev === section ? null : section));
  };

  if (!user) return <p className="loading">Loading your account...</p>;

  return (
    <div className="personal-account">
      <h2 className="welcome">Welcome, {user.firstName} {user.lastName}</h2>

      <div className="account-section">
        <button onClick={() => toggleSection('info')} className="section-toggle">My Information</button>
        {expanded === 'info' && (
          <div className="section-content">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Subscription:</strong> {user.subscription}</p>
          </div>
        )}
      </div>

      <div className="account-section">
        <button onClick={() => toggleSection('courses')} className="section-toggle">Enrolled Courses</button>
        {expanded === 'courses' && (
          <div className="section-content">
            {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
              <ul>
                {user.enrolledCourses.map((course, i) => (
                  <li key={i}>{typeof course === 'string' ? course : course.name || 'Unnamed Course'}</li>
                ))}
              </ul>
            ) : (
              <p>No enrolled courses yet.</p>
            )}
          </div>
        )}
      </div>

      <div className="account-section">
        <button onClick={() => toggleSection('payments')} className="section-toggle">Payment History</button>
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
        <button onClick={() => toggleSection('appointment')} className="section-toggle">Book Appointment</button>
        {expanded === 'appointment' && (
          <div className="section-content">
            <BookingForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalAccount;

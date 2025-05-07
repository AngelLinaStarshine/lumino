import React, { useEffect, useState } from 'react';
import './PersonalAccount.css';

function PersonalAccount() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    setUser(storedUser);
  }, []);

  if (!user) return <p style={{ padding: '2rem' }}>Loading your account...</p>;

  return (
    <div className="personal-account-page" style={{ padding: '2rem' }}>
      <h2>Welcome, {user.firstName} {user.lastName}</h2>

      <section className="account-info">
        <h3>Account Info</h3>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Subscription:</strong> {user.subscription}</p>
      </section>

      <section className="courses">
        <h3>Enrolled Courses</h3>
        {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
          <ul>
            {user.enrolledCourses.map((course, i) => (
              <li key={i}>{typeof course === 'string' ? course : course.name || 'Unnamed Course'}</li>
            ))}
          </ul>
        ) : (
          <p>No enrolled courses yet.</p>
        )}
      </section>

      <section className="payments">
        <h3>Payment History</h3>
        {user.paymentHistory && user.paymentHistory.length > 0 ? (
          <ul>
            {user.paymentHistory.map((payment, i) => (
              <li key={i}>{payment.date} - {payment.amount} - {payment.status}</li>
            ))}
          </ul>
        ) : (
          <p>No payment history found.</p>
        )}
      </section>
    </div>
  );
}

export default PersonalAccount;

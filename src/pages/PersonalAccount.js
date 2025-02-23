// PersonalAccount.js
import React from 'react';
import './PersonalAccount.css'; // Optional: for styling

function PersonalAccount() {
  return (
    <div className="personal-account">
      <h2>Welcome to Your Personal Account</h2>
      
      <section className="payment-info">
        <h3>Payment Information</h3>
        <p>Your payment details (invoices, billing info, etc.) will appear here.</p>
      </section>
      
      <section className="courses-details">
        <h3>Courses Details</h3>
        <p>Here you can view the courses you’ve enrolled in and their progress.</p>
      </section>
      
      <section className="student-success">
        <h3>Student Success</h3>
        <p>Check out your achievements and success metrics here.</p>
      </section>
    </div>
  );
}

export default PersonalAccount;

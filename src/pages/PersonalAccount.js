// src/pages/PersonalAccount.js
import React from 'react';
import './PersonalAccount.css';

function PersonalAccount() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    subscription: "Premium Plan",
    paymentMethod: "Credit Card (**** 1234)",
    enrolledCourses: ["STEM", "Art & Craft", "Language & Literature"],
    achievements: ["Completed STEM Basics", "Top Performer in Literature"],
    paymentHistory: [
      { date: "Jan 1, 2025", amount: "$50", status: "Paid" },
      { date: "Feb 1, 2025", amount: "$50", status: "Paid" }
    ]
  };

  return (
    <>
    

      <div className="personal-account">
        <h1>Welcome, {user.name}!</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Subscription:</strong> {user.subscription}</p>
        <p><strong>Payment Method:</strong> {user.paymentMethod}</p>

        <section className="payment-info">
          <h2>Payment Information</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {user.paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.date}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="courses-details">
          <h2>Your Courses</h2>
          <ul>
            {user.enrolledCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </section>

        <section className="student-success">
          <h2>Student Success</h2>
          <ul>
            {user.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </section>
      </div>

   
    </>
  );
}

export default PersonalAccount;

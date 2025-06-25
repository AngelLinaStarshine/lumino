// src/components/BookingForm.js
import React, { useState } from 'react';
import './BookingForm.css';

function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !date || !time) {
      alert('Please fill in all fields');
      return;
    }

    // Here you'd normally send to backend or Google Calendar API
    console.log({ name, email, date, time });
    setSubmitted(true);
  };

  return (
    <div className="booking-form-container">
      <h2>Book a Teacher Appointment</h2>
      {submitted ? (
        <p className="success-message">Thank you! Your appointment has been booked.</p>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

          <button type="submit">Book Appointment</button>
        </form>
      )}
    </div>
  );
}

export default BookingForm;

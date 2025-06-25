// Example: Handling booking and updating availability (Node.js + Express backend)

// Assume teacher availability is stored in MongoDB
const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher'); // MongoDB model

// Booking route
router.post('/book-appointment', async (req, res) => {
  const { teacherId, timeSlot, studentName, studentEmail } = req.body;

  try {
    // Find the teacher and check availability
    const teacher = await Teacher.findById(teacherId);
    if (!teacher.availability.includes(timeSlot)) {
      return res.status(400).json({ error: 'Slot no longer available' });
    }

    // Save booking info (can be stored in a separate collection)
    teacher.bookings.push({ timeSlot, studentName, studentEmail });

    // Remove the time slot from availability
    teacher.availability = teacher.availability.filter(slot => slot !== timeSlot);

    await teacher.save();

    res.status(200).json({ message: 'Appointment booked successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Booking failed' });
  }
});

module.exports = router;

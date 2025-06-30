const express = require('express');
const axios = require('axios');
const router = express.Router();

const MOODLE_URL = 'https://luminolearn.moodlecloud.com/webservice/rest/server.php';
const TOKEN = '3f8793246dd0be6e8d5a7159c6c357ad';

router.get('/user-courses/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const userUrl = `${MOODLE_URL}?wstoken=${TOKEN}&wsfunction=core_user_get_users_by_field&moodlewsrestformat=json&field=email&values[0]=${encodeURIComponent(email)}`;

    console.log('Fetching Moodle user by email:', email);
    const userResp = await axios.get(userUrl);

    // Check for string (non-JSON) response
    if (typeof userResp.data === 'string') {
      console.error('Non-JSON response from Moodle (User fetch):', userResp.data);
      return res.status(500).json({ error: 'Moodle returned unexpected response for user fetch.' });
    }

    const user = userResp.data[0];
    if (!user) {
      return res.status(404).json({ error: 'User not found in Moodle' });
    }

    const coursesUrl = `${MOODLE_URL}?wstoken=${TOKEN}&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=${user.id}`;
    console.log('Fetching enrolled courses for Moodle user ID:', user.id);

    const coursesResp = await axios.get(coursesUrl);

    if (typeof coursesResp.data === 'string') {
      console.error('Non-JSON response from Moodle (Course fetch):', coursesResp.data);
      return res.status(500).json({ error: 'Moodle returned unexpected response for course fetch.' });
    }

    res.json({ user, courses: coursesResp.data });

  } catch (err) {
    console.error('Moodle proxy error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch data from Moodle', details: err.message });
  }
});

module.exports = router;

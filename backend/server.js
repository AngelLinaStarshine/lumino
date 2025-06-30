const express = require('express');
const cors = require('cors');
const moodleRoutes = require('./routes/moodle'); // adjust path if needed

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/moodle', moodleRoutes);

app.get('/', (req, res) => {
  res.send('Moodle proxy is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const PORT = 4000;

app.use(cors({
  origin: 'http://localhost:5000',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = twilio(accountSid, authToken);

app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const result = await client.verify.v2.services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
    res.status(200).json({ success: true, status: result.status });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, code } = req.body;
  try {
    const check = await client.verify.v2.services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code });
    res.status(200).json({ success: true, status: check.status });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ OTP backend running at http://localhost:${PORT}`);
});

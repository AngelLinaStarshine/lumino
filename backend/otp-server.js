require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const PORT = 4000;

// CORS setup for development
app.use(cors());
app.use(bodyParser.json());

// Load from .env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;

// Validate presence of secrets
if (!accountSid || !authToken || !serviceSid) {
  console.error("❌ Missing Twilio credentials");
  process.exit(1);
}

const client = twilio(accountSid, authToken);

// Send OTP
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const result = await client.verify.v2.services(serviceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
    console.log(`✅ OTP sent to ${phoneNumber}: ${result.status}`);
    res.status(200).json({ success: true, status: result.status });
  } catch (err) {
    console.error('❌ Send OTP error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, code } = req.body;
  try {
    const check = await client.verify.v2.services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code });
    console.log(`✅ OTP verified for ${phoneNumber}: ${check.status}`);
    res.status(200).json({ success: true, status: check.status });
  } catch (err) {
    console.error('❌ Verify OTP error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ OTP backend running at http://localhost:${PORT}`);
});

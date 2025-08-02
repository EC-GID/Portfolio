const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
  origin: 'https://your-frontend-url.com'
}));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL,
    subject: `New Contact Message from ${name}`,
    text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
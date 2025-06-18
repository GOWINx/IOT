const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware if frontend is served separately
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // adjust as needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  // Option 1: Send email using nodemailer
  try {
    let transporter = nodemailer.createTransport({
      // Use your email service here:
      service: 'gmail',
      auth: {
        user: 'YOUR_EMAIL@gmail.com',       // Your Gmail
        pass: 'YOUR_EMAIL_APP_PASSWORD',    // App password or your email password (better use app password)
      },
    });

    let mailOptions = {
      from: email,
      to: 'YOUR_EMAIL@gmail.com', // Your email to receive the messages
      subject: `Contact form submission from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
  
  // Option 2 (alternative): Store in file or database instead of sending email
  // You can implement this if needed.
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  const { EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });
  }
  return transporter;
}

// Sends an alert email to the studio. Never throws, so a mail problem
// can never stop a booking or feedback from being saved.
export async function notifyStudio(subject, text) {
  const t = getTransporter();
  if (!t) return;
  try {
    await t.sendMail({
      from: `"Raja Photo Studio Website" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
      subject,
      text,
    });
  } catch (err) {
    console.error('Email alert failed:', err.message);
  }
}

import dns from 'node:dns';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import bookingsRouter from './routes/bookings.js';
import feedbackRouter from './routes/feedback.js';

// some networks block the DNS lookup MongoDB Atlas needs; use public DNS instead
if (process.env.USE_PUBLIC_DNS === 'true') {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '50kb' }));

// max 40 requests per 15 minutes from one visitor, to stop spam
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 40,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests. Please try again in a little while.' },
  })
);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'not connected' });
});

// forms need the database; answer clearly if it is down instead of hanging
const requireDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'We are having a small technical problem. Please call or WhatsApp us instead.',
    });
  }
  next();
};

app.use('/api/bookings', requireDb, bookingsRouter);
app.use('/api/feedback', requireDb, feedbackRouter);

app.use('/api', (req, res) => res.status(404).json({ message: 'Not found.' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid request.' });
  }
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on our side. Please try again.' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/raja-photo-studio', {
    serverSelectionTimeoutMS: 8000,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err.message));

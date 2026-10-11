import { Router } from 'express';
import Booking from '../models/Booking.js';
import { notifyStudio } from '../lib/mailer.js';

const router = Router();
const PHONE_RE = /^[0-9+\-\s]{8,15}$/;

router.post('/', async (req, res, next) => {
  try {
    const b = req.body || {};

    // spam trap: real visitors never fill this hidden field
    if (typeof b.website === 'string' && b.website.trim() !== '') {
      return res.status(201).json({ ok: true });
    }

    const name = String(b.name || '').trim();
    const phone = String(b.phone || '').trim();
    const eventType = String(b.eventType || '').trim();
    const packageName = String(b.packageName || '').trim().slice(0, 40);
    const message = String(b.message || '').trim().slice(0, 800);

    if (name.length < 2 || name.length > 80) {
      return res.status(400).json({ message: 'Please enter your name.' });
    }
    if (!PHONE_RE.test(phone)) {
      return res.status(400).json({ message: 'Please enter a valid phone number.' });
    }
    if (!eventType) {
      return res.status(400).json({ message: 'Please choose what we are shooting.' });
    }

    let eventDate;
    if (b.eventDate) {
      const d = new Date(b.eventDate);
      if (Number.isNaN(d.getTime())) {
        return res.status(400).json({ message: 'That date does not look right.' });
      }
      eventDate = d;
    }

    const booking = await Booking.create({ name, phone, eventType, eventDate, packageName, message });

    // do not wait for the email; the visitor gets their answer right away
    notifyStudio(
      `New booking request from ${name}`,
      [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Event: ${eventType}`,
        `Date: ${eventDate ? eventDate.toDateString() : 'not given'}`,
        `Package: ${packageName || 'not sure yet'}`,
        `Message: ${message || '-'}`,
      ].join('\n')
    );

    res.status(201).json({ ok: true, id: booking._id });
  } catch (err) {
    next(err);
  }
});

export default router;

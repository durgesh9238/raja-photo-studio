import { Router } from 'express';
import Feedback from '../models/Feedback.js';
import { notifyStudio } from '../lib/mailer.js';

const router = Router();
const ALLOWED_TAGS = [
  'Photos',
  'Video and film',
  'Team behaviour',
  'Delivery time',
  'Album quality',
  'Value for money',
];

router.post('/', async (req, res, next) => {
  try {
    const b = req.body || {};

    if (typeof b.website === 'string' && b.website.trim() !== '') {
      return res.status(201).json({ ok: true });
    }

    const name = String(b.name || '').trim();
    const rating = Number(b.rating);
    const eventType = String(b.eventType || '').trim().slice(0, 60);
    const message = String(b.message || '').trim().slice(0, 600);
    const tags = Array.isArray(b.tags) ? b.tags.filter((t) => ALLOWED_TAGS.includes(t)) : [];

    if (name.length < 2 || name.length > 80) {
      return res.status(400).json({ message: 'Please enter your name.' });
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Please choose a rating from 1 to 5.' });
    }

    const fb = await Feedback.create({
      name,
      rating,
      tags,
      eventType,
      message,
      allowPublic: b.allowPublic === true,
    });

    notifyStudio(
      `New feedback: ${rating}/5 from ${name}`,
      [
        `Name: ${name}`,
        `Rating: ${rating} / 5`,
        `Liked: ${tags.join(', ') || '-'}`,
        `Event: ${eventType || '-'}`,
        `Message: ${message || '-'}`,
        `OK to show publicly: ${b.allowPublic === true ? 'yes' : 'no'}`,
      ].join('\n')
    );

    res.status(201).json({ ok: true, id: fb._id });
  } catch (err) {
    next(err);
  }
});

export default router;

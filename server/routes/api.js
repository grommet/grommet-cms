import express from 'express';
import { isAuthed } from '../middleware/auth';

const router = express.Router();

// Check if user is authed.
router.get('/check', isAuthed, (req, res) => res.status(200).send('success'));

// Basic test to check API functionality is sound.
router.get('/ping', (req, res) => res.status(200).send('pong!'));

export default router;

import express from 'express';
import Snapshot from '../models/Snapshot.js';
import auth from '../middleware/auth.js';
import { canAccessServer } from '../utils/access.js';

const router = express.Router();

/* =========================
   OVERVIEW (dashboard home)
========================= */
router.get('/:serverId/overview', auth, async (req, res) => {
  const { serverId } = req.params;
  const { range = '7d' } = req.query;
  const token = req.headers.authorization.split(' ')[1];

  if (!(await canAccessServer(req.user, serverId, token)))
    return res.sendStatus(403);

  const snap = await Snapshot.findOne({ serverId, range })
    .sort({ createdAt: -1 });

  res.json(snap || null);
});

/* =========================
   CHANNELS
========================= */
router.get('/:serverId/channels', auth, async (req, res) => {
  const { serverId } = req.params;
  const { range = '7d' } = req.query;
  const token = req.headers.authorization.split(' ')[1];

  if (!(await canAccessServer(req.user, serverId, token)))
    return res.sendStatus(403);

  const snap = await Snapshot.findOne(
    { serverId, range },
    { topChannels: 1 }
  );

  res.json(snap?.topChannels || []);
});

/* =========================
   MEMBERS
========================= */
router.get('/:serverId/members', auth, async (req, res) => {
  const { serverId } = req.params;
  const { range = '7d' } = req.query;
  const token = req.headers.authorization.split(' ')[1];

  if (!(await canAccessServer(req.user, serverId, token)))
    return res.sendStatus(403);

  const snap = await Snapshot.findOne(
    { serverId, range },
    { members: 1, chart: 1 }
  );

  res.json(snap || null);
});

/* =========================
   MESSAGES
========================= */
router.get('/:serverId/messages', auth, async (req, res) => {
  const { serverId } = req.params;
  const { range = '7d' } = req.query;
  const token = req.headers.authorization.split(' ')[1];

  if (!(await canAccessServer(req.user, serverId, token)))
    return res.sendStatus(403);

  const snap = await Snapshot.findOne(
    { serverId, range },
    { messages: 1, chart: 1 }
  );

  res.json(snap || null);
});

export default router;

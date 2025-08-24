// Resume and Cover Letter API routes for Express backend
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Middleware to require authentication
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = require('jsonwebtoken').verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Create resume or cover letter
router.post('/', auth, async (req, res) => {
  const { content, type } = req.body;
  if (!content) return res.status(400).json({ error: 'Content required' });
  const docType = type === 'cover_letter' ? 'cover_letter' : 'resume';
  const resume = await prisma.resume.create({
    data: {
      content,
      type: docType,
      user: { connect: { id: req.userId } },
    },
  });
  res.json(resume);
});

// Get all resumes/cover letters for user, with optional type filter
router.get('/', auth, async (req, res) => {
  const { type } = req.query;
  const where = { userId: req.userId };
  if (type === 'resume' || type === 'cover_letter') where.type = type;
  const resumes = await prisma.resume.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
  });
  res.json(resumes);
});

// Get single resume/cover letter
router.get('/:id', auth, async (req, res) => {
  const resume = await prisma.resume.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!resume || resume.userId !== req.userId) return res.status(404).json({ error: 'Not found' });
  res.json(resume);
});

// Update resume/cover letter
router.put('/:id', auth, async (req, res) => {
  const { content } = req.body;
  const resume = await prisma.resume.findUnique({ where: { id: Number(req.params.id) } });
  if (!resume || resume.userId !== req.userId) return res.status(404).json({ error: 'Not found' });
  const updated = await prisma.resume.update({
    where: { id: Number(req.params.id) },
    data: { content },
  });
  res.json(updated);
});

// Delete resume/cover letter
router.delete('/:id', auth, async (req, res) => {
  const resume = await prisma.resume.findUnique({ where: { id: Number(req.params.id) } });
  if (!resume || resume.userId !== req.userId) return res.status(404).json({ error: 'Not found' });
  await prisma.resume.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

module.exports = router;

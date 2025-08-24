// DEBUG ONLY: Remove this endpoint in production!
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/debug/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;

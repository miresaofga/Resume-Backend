const express = require('express');
const router = express.Router();

// Middleware to check if user is paid
function isPaidUser(req, res, next) {
  if (req.user && req.user.isPaid) {
    return next();
  }
  return res.status(403).json({ error: 'Access denied: Paid users only.' });
}

// Middleware to check if user is a walker (demo/free)
function isWalker(req, res, next) {
  if (req.user && !req.user.isPaid) {
    return next();
  }
  return res.status(403).json({ error: 'Access denied: Walkers only.' });
}

// Example paid user route with 3 copies/downloads limit
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/paid', isPaidUser, async (req, res) => {
  try {
    // req.user should be set by auth middleware in main server
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.downloadCount >= 3) {
      return res.status(403).json({ error: 'Download/copy limit reached (3/3)' });
    }
    // You can increment downloadCount here if this endpoint is used for actual download/copy
    // await prisma.user.update({ where: { id: userId }, data: { downloadCount: { increment: 1 } } });
    res.json({ message: `Welcome, paid user! You have ${3 - user.downloadCount} copies left.`, copiesLeft: 3 - user.downloadCount });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Example walker (demo/free) user route
router.get('/walker', isWalker, (req, res) => {
  res.json({ message: 'Welcome, walker (demo/free) user!' });
});

module.exports = router;

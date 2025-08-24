const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Restrict CORS to only allow frontend domain in production
const allowedOrigins = process.env.NODE_ENV === 'production' ? ['https://your-frontend-domain.com'] : ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());



// Register
const { sendRegistrationEmail } = require('./utils/email');
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
  // console.log('Register attempt:', { email, name });
    if (!email || !password) {
  // console.log('Missing email or password');
      return res.status(400).json({ error: 'Email and password required' });
    }
  // Duplicate email check removed: allow multiple registrations with the same email
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hash, name } });
  // console.log('User created:', user);
    // Send registration email (non-blocking)
    sendRegistrationEmail(email, name).catch(console.error);
    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (err) {
  // console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log('Login attempt:', email);
  const user = await prisma.user.findUnique({ where: { email } });
  // console.log('User found for login:', user);
  if (!user || !user.password) {
  // console.log('Invalid credentials: user not found or no password');
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
  // console.log('Invalid credentials: password mismatch');
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  // console.log('Login successful for:', email);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// Auth middleware
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Get current user
app.get('/api/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email, name: user.name, downloadCount: user.downloadCount });
});



// Mount resume/cover letter routes

// Mount resume/cover letter routes
app.use('/api/resume', require('./routes/resume'));
// Mount AI generation route
app.use('/api/ai', require('./routes/ai'));
// Mount download route
app.use('/api/download', require('./routes/download'));
// Mount payment route
app.use('/api/payment', require('./routes/payment'));
// Mount user type route
app.use('/api/user-type', require('./routes/userType'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));

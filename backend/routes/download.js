const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { jsPDF } = require('jspdf');
const { Document, Packer, Paragraph } = require('docx');
const router = express.Router();
const prisma = new PrismaClient();

// Auth middleware (reuse from server.js)
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

// Download as PDF
router.get('/:id/pdf', auth, async (req, res) => {
  const resume = await prisma.resume.findUnique({ where: { id: Number(req.params.id) } });
  if (!resume || resume.userId !== req.userId) return res.status(404).json({ error: 'Not found' });
  // Download limit logic
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(401).json({ error: 'User not found' });
  // Check for at least one payment
  const payment = await prisma.payment.findFirst({ where: { userId: user.id } });
  if (!payment) {
    return res.status(403).json({ error: 'Please make a one-time payment to download your resume or cover letter.' });
  }
  if (user.downloadCount !== null && user.downloadCount >= 3) {
    return res.status(402).json({ error: 'You have reached your 3 downloads for this payment. Please purchase again for more downloads.' });
  }
  // Try to parse content as JSON for structured resumes, fallback to plain text
  let data;
  try {
    data = JSON.parse(resume.content);
  } catch {
    data = { content: resume.content };
  }
  const doc = new jsPDF();
  let y = 20;
  // Header
  if (data.name) {
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(data.name, 105, y, { align: 'center' });
    y += 10;
  }
  if (data.email) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(data.email, 105, y, { align: 'center' });
    y += 10;
  }
  // Section helper
  function section(title, text) {
    if (!text) return;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 10, y);
    y += 7;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, 190);
    doc.text(lines, 10, y);
    y += lines.length * 7 + 3;
  }
  section('Education', data.education);
  section('Experience', data.experience);
  section('Skills', data.skills);
  section('Summary', data.summary);
  // Fallback for plain content
  if (!data.education && !data.experience && !data.skills && data.content) {
    section('Resume', data.content);
  }
  const pdf = doc.output('arraybuffer');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=document.pdf`);
  res.send(Buffer.from(pdf));
  // Increment downloadCount
  await prisma.user.update({ where: { id: req.userId }, data: { downloadCount: { increment: 1 } } });
});

// Download as DOCX
router.get('/:id/docx', auth, async (req, res) => {
  const resume = await prisma.resume.findUnique({ where: { id: Number(req.params.id) } });
  if (!resume || resume.userId !== req.userId) return res.status(404).json({ error: 'Not found' });
  // Download limit logic
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(401).json({ error: 'User not found' });
  // Check for at least one payment
  const payment = await prisma.payment.findFirst({ where: { userId: user.id } });
  if (!payment) {
    return res.status(403).json({ error: 'Please make a one-time payment to download your resume or cover letter.' });
  }
  if (user.downloadCount !== null && user.downloadCount >= 3) {
    return res.status(402).json({ error: 'You have reached your 3 downloads for this payment. Please purchase again for more downloads.' });
  }
  // Generate and send file
  const doc = new Document({
    sections: [
      { properties: {}, children: [new Paragraph(resume.content)] },
    ],
  });
  const buffer = await Packer.toBuffer(doc);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename=document.docx`);
  res.send(buffer);
  // Increment downloadCount
  await prisma.user.update({ where: { id: req.userId }, data: { downloadCount: { increment: 1 } } });
});

// Download as DOC (fallback: send as plain text with .doc extension)
router.get('/:id/doc', auth, async (req, res) => {
  const resume = await prisma.resume.findUnique({ where: { id: Number(req.params.id) } });
  if (!resume || resume.userId !== req.userId) return res.status(404).json({ error: 'Not found' });
  // Download limit logic
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(401).json({ error: 'User not found' });
  // Check for at least one payment
  const payment = await prisma.payment.findFirst({ where: { userId: user.id } });
  if (!payment) {
    return res.status(403).json({ error: 'Please make a one-time payment to download your resume or cover letter.' });
  }
  if (user.downloadCount !== null && user.downloadCount >= 3) {
    return res.status(402).json({ error: 'You have reached your 3 downloads for this payment. Please purchase again for more downloads.' });
  }
  // Generate and send file
  res.setHeader('Content-Type', 'application/msword');
  res.setHeader('Content-Disposition', `attachment; filename=document.doc`);
  res.send(resume.content);
  // Increment downloadCount
  await prisma.user.update({ where: { id: req.userId }, data: { downloadCount: { increment: 1 } } });
});

module.exports = router;

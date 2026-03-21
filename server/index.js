require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');
const Contact = require('./models/Contact');
const Upload = require('./models/Upload');
const Gallery = require('./models/Gallery');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer — Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'portfolio/gallery', allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'] }
});

// Multer — Cloudinary storage for files
const fileStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: 'portfolio/files',
    resource_type: 'auto',
    public_id: `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`
  })
});

const uploadImage = multer({ storage: imageStorage });
const uploadFile = multer({ storage: fileStorage });

// JWT auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'admin_secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ── Admin login ──────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password !== (process.env.ADMIN_PASS || 'admin123'))
    return res.status(401).json({ error: 'Wrong password' });
  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || 'admin_secret', { expiresIn: '7d' });
  res.json({ token });
});

// ── Gallery ──────────────────────────────────────────────────
app.post('/api/admin/gallery', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image required' });
    const doc = new Gallery({
      title: title || req.file.originalname,
      description: description || '',
      category: category || 'photo',
      filename: req.file.path,        // Cloudinary URL
      originalName: req.file.originalname,
      cloudinaryId: req.file.filename // public_id
    });
    await doc.save();
    res.json({ success: true, item: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/admin/gallery', auth, async (req, res) => {
  const items = await Gallery.find().sort({ createdAt: -1 });
  res.json(items);
});

app.get('/api/gallery', async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const items = await Gallery.find(filter).sort({ createdAt: -1 });
  res.json(items);
});

app.delete('/api/admin/gallery/:id', auth, async (req, res) => {
  try {
    const doc = await Gallery.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    if (doc.cloudinaryId) {
      await cloudinary.uploader.destroy(doc.cloudinaryId).catch(() => {});
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// ── File uploads ─────────────────────────────────────────────
app.post('/api/admin/upload', auth, uploadFile.single('file'), async (req, res) => {
  try {
    const doc = new Upload({
      filename: req.file.path,         // Cloudinary URL
      originalName: req.file.originalname,
      description: req.body.description || '',
      mimetype: req.file.mimetype,
      size: req.file.size || 0,
      cloudinaryId: req.file.filename
    });
    await doc.save();
    res.json({ success: true, file: doc });
  } catch {
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/admin/uploads', auth, async (req, res) => {
  const files = await Upload.find().sort({ createdAt: -1 });
  res.json(files);
});

app.get('/api/uploads', async (req, res) => {
  const files = await Upload.find().sort({ createdAt: -1 });
  res.json(files);
});

app.delete('/api/admin/uploads/:id', auth, async (req, res) => {
  try {
    const doc = await Upload.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    if (doc.cloudinaryId) {
      await cloudinary.uploader.destroy(doc.cloudinaryId, { resource_type: 'auto' }).catch(() => {});
    }
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// ── Contact form ─────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: 'All fields required' });
    await new Contact({ name, email, message }).save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/admin/contacts', auth, async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Serve React frontend in production
const clientBuild = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuild));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

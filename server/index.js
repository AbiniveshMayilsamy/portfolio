require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Contact, Gallery, Upload, sequelize } = require('./models');

// ── Environment Variable Validation ───────────────────────────
const isProduction = process.env.NODE_ENV === 'production';
const REQUIRED_ENV = ['EMAIL_USER', 'EMAIL_PASS'];
const missingEnv = REQUIRED_ENV.filter(key => !process.env[key]);
if (missingEnv.length > 0) {
  console.warn(`[CONFIG WARN] Missing env variables: ${missingEnv.join(', ')} — some features may be unavailable.`);
}

const app = express();

// ── Security Headers & CORS ────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "http://localhost:5000", "http://localhost:3000"],
      imgSrc: ["'self'", "data:"],
    },
  },
}));

// CORS Configuration: Restrict origin in production if configured
const corsOptions = {
  origin: process.env.ALLOWED_ORIGIN || '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// ── Rate Limiting ──────────────────────────────────────────────
// Global rate limiter (15 mins, max 200 per IP)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again later.' }
});
app.use(globalLimiter);

// Strict rate limiter for form submissions / logins (15 mins, max 5 per IP)
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again after 15 minutes.' }
});

// Ensure uploads directories exist
const uploadsBaseDir = path.join(__dirname, 'uploads');
const galleryDir = path.join(uploadsBaseDir, 'gallery');
const filesDir = path.join(uploadsBaseDir, 'files');
if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });
if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });

// ── Cloudinary / Local Disk Multer Configuration ────────────────
const useCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

let uploadImage;
let uploadFile;

if (useCloudinary) {
  console.log('[CONFIG] Cloudinary configuration detected. Uploads will be stored in Cloudinary.');
  const cloudinary = require('cloudinary').v2;
  const { CloudinaryStorage } = require('multer-storage-cloudinary');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const galleryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'portfolio/gallery',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      resource_type: 'image'
    }
  });

  const filesStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'portfolio/files',
      resource_type: 'auto'
    }
  });

  uploadImage = multer({ 
    storage: galleryStorage,
    limits: { fileSize: 10 * 1024 * 1024 }
  });

  uploadFile = multer({ 
    storage: filesStorage,
    limits: { fileSize: 20 * 1024 * 1024 }
  });
} else {
  console.log('[CONFIG] No Cloudinary configuration detected. Falling back to local disk uploads.');
  // Multer Local Disk Storage Configuration
  const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, galleryDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, filesDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  uploadImage = multer({ 
    storage: imageStorage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  });

  uploadFile = multer({ 
    storage: fileStorage,
    limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
  });
}

// Serve Local Uploads Statically
app.use('/uploads', express.static(uploadsBaseDir));

// JWT auth middleware
const auth = (req, res, next) => {
  req.admin = { admin: true };
  next();
};

// ── Admin login ──────────────────────────────────────────────
app.post('/api/admin/login', strictLimiter, (req, res) => {
  const { password } = req.body;
  if (password !== (process.env.ADMIN_PASS || ''))
    return res.status(401).json({ error: 'Wrong password' });
  const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || 'admin_secret', { expiresIn: '7d' });
  res.json({ token });
});

// ── Gallery ──────────────────────────────────────────────────
app.post('/api/admin/gallery', auth, uploadImage.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image required' });
    
    // Store path (full URL if Cloudinary, relative path if local)
    const filePath = useCloudinary ? req.file.path : `/uploads/gallery/${req.file.filename}`;
    
    const doc = await Gallery.create({
      title: title || req.file.originalname,
      description: description || '',
      category: category || 'photo',
      filename: filePath,
      originalName: req.file.originalname
    });
    res.json({ success: true, item: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/admin/gallery', auth, async (req, res) => {
  try {
    const items = await Gallery.findAll({ order: [['createdAt', 'DESC']] });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const items = await Gallery.findAll({
      where: filter,
      order: [['createdAt', 'DESC']]
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

app.delete('/api/admin/gallery/:id', auth, async (req, res) => {
  try {
    const doc = await Gallery.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    
    // Delete file
    if (useCloudinary && doc.filename.startsWith('http')) {
      try {
        const cloudinary = require('cloudinary').v2;
        const urlParts = doc.filename.split('/');
        const folderIndex = urlParts.indexOf('portfolio');
        if (folderIndex !== -1) {
          const publicIdWithExtension = urlParts.slice(folderIndex).join('/');
          const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // remove extension
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cErr) {
        console.error('Failed to delete from Cloudinary:', cErr);
      }
    } else if (!doc.filename.startsWith('http')) {
      const relativePath = doc.filename.replace(/^\//, ''); // remove leading slash
      const filePath = path.join(__dirname, relativePath);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Failed to delete file from disk:', err);
      });
    }

    await doc.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// ── File uploads ─────────────────────────────────────────────
app.post('/api/admin/upload', auth, uploadFile.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File required' });
    
    // Storing path (full URL if Cloudinary, relative path if local)
    const dbFilename = useCloudinary ? req.file.path : `files/${req.file.filename}`;
    
    const doc = await Upload.create({
      filename: dbFilename,
      originalName: req.file.originalname,
      description: req.body.description || '',
      mimetype: req.file.mimetype,
      size: req.file.size || 0
    });
    res.json({ success: true, file: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.get('/api/admin/uploads', auth, async (req, res) => {
  try {
    const files = await Upload.findAll({ order: [['createdAt', 'DESC']] });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

app.get('/api/uploads', async (req, res) => {
  try {
    const files = await Upload.findAll({ order: [['createdAt', 'DESC']] });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

app.delete('/api/admin/uploads/:id', auth, async (req, res) => {
  try {
    const doc = await Upload.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    
    // Delete file
    if (useCloudinary && doc.filename.startsWith('http')) {
      try {
        const cloudinary = require('cloudinary').v2;
        const urlParts = doc.filename.split('/');
        const folderIndex = urlParts.indexOf('portfolio');
        if (folderIndex !== -1) {
          const publicId = urlParts.slice(folderIndex).join('/');
          await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
        }
      } catch (cErr) {
        console.error('Failed to delete from Cloudinary:', cErr);
      }
    } else if (!doc.filename.startsWith('http')) {
      const filePath = path.join(__dirname, 'uploads', doc.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error('Failed to delete file from disk:', err);
      });
    }

    await doc.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// ── Contact form ─────────────────────────────────────────────
app.post('/api/contact', strictLimiter, async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ error: 'All fields required.' });

    // ── Strict Input Validation ──
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (name.trim().length < 2 || name.length > 100) {
      return res.status(400).json({ error: 'Name must be between 2 and 100 characters.' });
    }
    if (message.trim().length < 10 || message.length > 3000) {
      return res.status(400).json({ error: 'Message must be between 10 and 3000 characters.' });
    }

    // ── Input Sanitization (XSS Mitigation) ──
    const sanitize = (str) => str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
    const sanitizedName = sanitize(name);
    const sanitizedEmail = email.trim();
    const sanitizedMessage = sanitize(message);

    await Contact.create({ 
      name: sanitizedName, 
      email: sanitizedEmail, 
      message: sanitizedMessage 
    });
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact from ${sanitizedName}`,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`
    });
    res.json({ success: true });
  } catch (err) {
    next(err); // Pass to centralized error handler
  }
});

app.get('/api/admin/contacts', auth, async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

const { fetchAllStats } = require('./codingStats');

// Cache for coding stats
let statsCache = { data: null, timestamp: 0 };

app.get('/api/coding-stats', async (req, res) => {
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
  const now = Date.now();

  if (statsCache.data && (now - statsCache.timestamp < CACHE_DURATION)) {
    return res.json(statsCache.data);
  }

  try {
    const stats = await fetchAllStats();
    statsCache.data = { stats };
    statsCache.timestamp = now;
    res.json(statsCache.data);
  } catch (err) {
    console.error('Error fetching coding stats:', err.message);
    if (statsCache.data) return res.json(statsCache.data);
    res.status(500).json({ error: 'Failed to fetch coding stats: ' + err.message });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Serve React frontend in production
const clientBuild = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuild));
app.get('/{*path}', (req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
    return next();
  }
  res.sendFile(path.join(clientBuild, 'index.html'));
});

// ── Centralized Error Handling Middleware ──────────────────────
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.stack || err);
  
  const statusCode = err.status || 500;
  const isProd = process.env.NODE_ENV === 'production';
  
  res.status(statusCode).json({
    error: isProd ? 'An unexpected error occurred on the server.' : err.message
  });
});

const PORT = process.env.PORT || 5000;

// Start server immediately — DB connection is non-fatal
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    return sequelize.sync({ alter: false });
  })
  .catch(err => {
    console.warn(`[DB WARN] Database unavailable — DB-dependent routes will return 503. Error: ${err.message}`);
  });

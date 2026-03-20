# Abinivesh M — MERN Portfolio

A professional dark-themed portfolio website built with the MERN stack.

## 🚀 Tech Stack
- **Frontend:** React + Vite, Framer Motion, React Icons, CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Email:** Nodemailer

## 📁 Structure
```
Portfolio/
├── client/          # React frontend (Vite)
│   └── src/
│       └── components/
├── server/          # Express backend
│   ├── models/
│   └── index.js
└── package.json
```

## ⚙️ Setup & Run

### 1. Configure environment
Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 2. Start Backend
```bash
cd server
node index.js
```

### 3. Start Frontend
```bash
cd client
npm run dev
```

Frontend runs on **http://localhost:3000**  
Backend runs on **http://localhost:5000**

## 📌 Sections
- Hero — Name, roles, CTA buttons, social links
- About — Bio and personal info
- Skills — Grouped by category with tags
- Projects — 6 projects with GitHub/Live links
- Experience — Timeline with internship details
- Education — Academic background + achievements
- Contact — Form (saves to MongoDB + sends email)

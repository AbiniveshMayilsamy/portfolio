// Script to initialize default content keys
const { sequelize, Content } = require('./models');

const DEFAULT_CONTENT = [
  // Hero Section
  { key: 'hero_name', value: 'ABINIVESH MAYILSAMY', type: 'text', category: 'hero' },
  { key: 'hero_role', value: 'Cloud Engineer, Full Stack Developer, Linux Admin Aspirant', type: 'text', category: 'hero' },
  { key: 'hero_subtitle', value: 'Designing scalable AWS infrastructure, Linux systems, and full stack applications to deliver reliable, high-performance solutions.', type: 'textarea', category: 'hero' },
  { key: 'hero_status', value: 'Available', type: 'text', category: 'hero' },

  // About Section
  { key: 'about_title', value: 'The engineering behind the code.', type: 'text', category: 'about' },
  { key: 'about_bio1', value: "I'm a Computer Science Engineering student passionate about cloud infrastructure, Linux systems, and full stack development. I specialize in designing and deploying scalable cloud-native solutions on AWS, with a strong interest in system administration and DevOps practices.", type: 'textarea', category: 'about' },
  { key: 'about_bio2', value: 'Admitted to B.E. CSE at Sri Eshwar College of Engineering via lateral entry after completing my Diploma in Computer Engineering at Nachimuthu Polytechnic College with 92.5%. Holding AWS Certified Solutions Architect – Associate (SAA-C03) & AWS Certified Cloud Practitioner (CLF-C02) certifications and preparing for HashiCorp Certified: Terraform Associate (003), with a strong aspiration to specialize in Linux system administration and cloud infrastructure.', type: 'textarea', category: 'about' },
  { key: 'about_bio3', value: "Hackathon highlights: 2nd Prize at Fiestaa'26 (KPR Institute) for Agentic AI Loan Approval System, Top 300 Finalist at FixForward Ideathon 2026, and participant at Bonfiglioli Smart Motion Hackathon 2.0 building the Neuro-Nav AGV.", type: 'textarea', category: 'about' },

  // Stats
  { key: 'stats_projects', value: '5+', type: 'text', category: 'about' },
  { key: 'stats_internships', value: '3', type: 'text', category: 'about' },
  { key: 'stats_skills', value: '15+', type: 'text', category: 'about' },
  { key: 'stats_contributions', value: '200+', type: 'text', category: 'about' },
  { key: 'stats_ambassador', value: 'Naan Mudhalvan', type: 'text', category: 'about' },
  { key: 'stats_pagespeed', value: '100', type: 'text', category: 'about' },

  // Skills Section
  { key: 'skills_title', value: 'Three disciplines. One developer.', type: 'text', category: 'skills' },

  // Skill Cards
  { key: 'skill1_title', value: 'Cloud & Infrastructure', type: 'text', category: 'skills' },
  { key: 'skill1_desc', value: 'Architecting and deploying scalable cloud-native solutions on AWS. Aspiring Linux System Administrator with a strong focus on server management, cloud security, and DevOps workflows.', type: 'textarea', category: 'skills' },
  { key: 'skill1_features', value: JSON.stringify(['AWS Cloud services & deployment (AWS Certified Solutions Architect & Cloud Practitioner)', 'AWS Certified Solutions Architect – Associate (SAA-C03)', 'AWS Certified Cloud Practitioner (CLF-C02)', 'Preparing for HashiCorp Certified: Terraform Associate (003)', 'Linux system administration & server management', 'Cloud security, IAM & cost optimization', 'CI/CD pipelines, Terraform & DevOps practices']), type: 'json', category: 'skills' },
  { key: 'skill1_tech', value: 'AWS, Terraform, Linux, EC2, S3, IAM, Docker, CI/CD', type: 'text', category: 'skills' },

  { key: 'skill2_title', value: 'Full Stack Development', type: 'text', category: 'skills' },
  { key: 'skill2_desc', value: 'Engineering scalable web applications with modern full stack technologies, from REST APIs to responsive frontends.', type: 'textarea', category: 'skills' },
  { key: 'skill2_features', value: JSON.stringify(['MERN Stack web applications', 'Java Spring Boot backends', 'Headless CMS integrations (Strapi, WordPress)', 'Authentication, REST APIs & database design']), type: 'json', category: 'skills' },
  { key: 'skill2_tech', value: 'React.js, Node.js, Express.js, Java Spring Boot, MongoDB, MySQL', type: 'text', category: 'skills' },

  { key: 'skill3_title', value: 'Machine Learning & AI', type: 'text', category: 'skills' },
  { key: 'skill3_desc', value: 'Developing intelligent systems including agentic AI architectures, voice emotion detection, and computer vision pipelines.', type: 'textarea', category: 'skills' },
  { key: 'skill3_features', value: JSON.stringify(['Agentic AI Loan Approval System', 'VocalMood — voice emotion detection (RNN)', 'Computer vision body measurement (OpenCV)', 'ML model training & inference pipelines']), type: 'json', category: 'skills' },
  { key: 'skill3_tech', value: 'Python, TensorFlow, OpenCV, RNN Models, ML Pipelines', type: 'text', category: 'skills' },

  // Projects Section
  { key: 'projects_title', value: "What I've built.", type: 'text', category: 'projects' },

  // Experience Section
  { key: 'experience_title', value: "Where I've contributed.", type: 'text', category: 'experience' },

  // Education Section
  { key: 'education_title', value: 'Academic foundation.', type: 'text', category: 'education' },

  // Gallery Section
  { key: 'gallery_title', value: 'Moments & Achievements', type: 'text', category: 'gallery' },

  // FAQ Section
  { key: 'faq_title', value: 'Common questions.', type: 'text', category: 'faq' },
  { key: 'faq_subtitle', value: 'Frequently Asked Questions', type: 'text', category: 'faq' },

  // Contact Section
  { key: 'contact_title', value: 'Start a project.', type: 'text', category: 'contact' },
  { key: 'contact_subtitle', value: 'Contact / Get In Touch', type: 'text', category: 'contact' },
  { key: 'contact_intro', value: "I'm currently seeking **Full Stack & Machine Learning internships**. If you've got an ambitious project, a query, or simply want to chat engineering — let's build something.", type: 'textarea', category: 'contact' },

  // Footer
  { key: 'footer_bio', value: 'CS Student at SECE, MERN developer, and ML researcher. Building the infrastructure that powers tomorrow\'s apps.', type: 'textarea', category: 'footer' },

  // Static Data Keys (for marquee, etc.)
  { key: 'marquee_items', value: '🏆 Competition Winner, ☁️ AWS Certified — Intellipaat, 🎓 IIT Madras — ML & Computer Vision, ✅ Oracle Java Fundamentals Badge, 🥇 HackerRank SQL Advanced, 🎪 TN Skills Naan Mudhalvan Ambassador, 🚀 MERN Stack Developer, 🤖 ML & Computer Vision Projects', type: 'text', category: 'general' },
];

async function initContent() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await sequelize.sync({ alter: true });
    console.log('Tables synced');

    for (const item of DEFAULT_CONTENT) {
      await Content.upsert(item);
    }

    console.log('Default content initialized successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

initContent();
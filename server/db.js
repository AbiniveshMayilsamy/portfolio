const { Sequelize } = require('sequelize');

// ── Database Connection ─────────────────────────────────────────
// Supports DATABASE_URL (standard for Railway, Render, etc.)
// Falls back to individual PG_* env vars for local development.

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'production' ? false : console.log,
      dialectOptions: process.env.NODE_ENV === 'production'
        ? { ssl: { require: true, rejectUnauthorized: false } }
        : {},
      pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
    })
  : new Sequelize(
      process.env.PG_DATABASE || 'portfolio',
      process.env.PG_USER || 'postgres',
      process.env.PG_PASSWORD || 'postgres',
      {
        host: process.env.PG_HOST || 'localhost',
        port: parseInt(process.env.PG_PORT || '5432', 10),
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'production' ? false : console.log,
        pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
      }
    );

module.exports = sequelize;

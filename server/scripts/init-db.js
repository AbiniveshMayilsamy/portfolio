require('dotenv').config();
const { sequelize } = require('../models');

async function initDB() {
  try {
    console.log('Testing connection to PostgreSQL...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    console.log('Syncing database schema (force: false, alter: true)...');
    await sequelize.sync({ alter: true });
    console.log('All models synced successfully. Database is ready.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect/sync with the database:', error);
    process.exit(1);
  }
}

initDB();

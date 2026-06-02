const sequelize = require('../db');
const Contact = require('./Contact');
const Gallery = require('./Gallery');
const Upload = require('./Upload');

// Export the sequelize instance and all models
module.exports = {
  sequelize,
  Contact,
  Gallery,
  Upload
};

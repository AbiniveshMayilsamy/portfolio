const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { len: [2, 100] },
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: { isEmail: true },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: { len: [10, 3000] },
  },
}, {
  tableName: 'contacts',
  timestamps: true,       // createdAt + updatedAt
  underscored: true,      // snake_case column names in DB
});

module.exports = Contact;

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Content = sequelize.define('Content', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: 'Unique key for content piece, e.g., "about_bio", "hero_role", etc.',
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Content value (text, JSON string, or URL)',
  },
  type: {
    type: DataTypes.ENUM('text', 'textarea', 'json', 'url', 'number'),
    defaultValue: 'text',
  },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'general',
    comment: 'Group content by category: hero, about, skills, projects, etc.',
  },
}, {
  tableName: 'content',
  timestamps: true,
  underscored: true,
});

module.exports = Content;
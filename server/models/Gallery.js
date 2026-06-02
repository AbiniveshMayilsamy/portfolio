const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Gallery = sequelize.define('Gallery', {
  _id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  category: {
    type: DataTypes.ENUM('event', 'prize', 'photo'),
    defaultValue: 'photo',
  },
  filename: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: 'Relative URL path e.g. /uploads/gallery/1717250000-a3f2b1.webp',
  },
  originalName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'original_name',
  },
}, {
  tableName: 'gallery',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['category'] },
    { fields: ['created_at'] },
  ],
});

module.exports = Gallery;

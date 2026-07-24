const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Upload = sequelize.define('Upload', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  filename: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: 'Relative URL path/suffix e.g. files/1717250000-a3f2b1.pdf',
  },
  originalName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'original_name',
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  mimetype: {
    type: DataTypes.STRING(100),
    field: 'mime_type',
  },
  size: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'size',
  },
}, {
  tableName: 'uploads',
  timestamps: true,
  underscored: true,
});

module.exports = Upload;

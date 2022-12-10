const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const Note = sequelize.define('calendar', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE },
  text: { type: DataTypes.STRING },
});

module.exports = Note;

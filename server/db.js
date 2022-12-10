const { Sequelize } = require('sequelize');

module.exports = new Sequelize('calendar', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

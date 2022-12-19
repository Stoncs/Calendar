const request = require('supertest');
const Sequelize = require('sequelize');
const server = require('./index.js');

beforeEach(async () => {
  let mockedSequelize = new Sequelize('calendar', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
  });
  await mockedSequelize.sync({ force: true });
});

test('/ping', async () => {
  await request(server)
    .get('/ping')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(({ body }) => {
      expect(body).toEqual({ pong: true });
    });
});

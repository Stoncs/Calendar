const request = require("supertest");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const server = require("./index.js");

beforeEach(async () => {
  let mockedSequelize = new Sequelize("calendar", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres",
  });
  mockedSequelize.define("calendar", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATE },
    text: { type: DataTypes.STRING },
  });
  try {
    await mockedSequelize.authenticate();
    await mockedSequelize.sync({ force: true });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

test("/ping", async () => {
  await request(server)
    .get("/ping")
    .expect("Content-Type", /json/)
    .expect(200)
    .expect(({ body }) => {
      expect(body).toEqual({ pong: true });
    });
});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");
const sequelize = require("./db");
require("dotenv").config();

const app = express();
// parse requests of content-type - application/json
app.use(express.json());
app.use(cors());
app.use("/api", router);

// set port, listen for requests
const PORT = process.env.DB_PORT || 8080;

// ping function
app.get("/ping", (req, res) => res.json({ pong: true }));
let server = app.listen(PORT, () => console.log("server started ", PORT));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true, logging: false });
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = server;

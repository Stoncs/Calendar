const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/index');
const sequelize = require('./db');
require('dotenv').config();

const app = express();
// parse requests of content-type - application/json
app.use(express.json());
app.use(cors());
app.use('/api', router);

// set port, listen for requests
const PORT = process.env.DB_PORT || 8080;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log('server started ', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

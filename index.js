const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const CONFIG = require('./config/config');
const routes = require('./routes');

const mongoConnectionURI = CONFIG.DB_PASSWORD && CONFIG.DB_USERNAME
  ? `mongodb://${CONFIG.DB_USERNAME}:${CONFIG.DB_PASSWORD}@${CONFIG.DB_URL}/${CONFIG.DB_NAME}`
  : `mongodb://${CONFIG.DB_URL}/${CONFIG.DB_NAME}`;

mongoose.connect(mongoConnectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

let logger = morgan('combined');
if (CONFIG.APP_ENV === 'development') {
  logger = morgan('dev');
}

const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());

app.get('/health', async (req, res) => {
  res.status(200).send({
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  });
});

app.use('/api', routes);

app.listen(CONFIG.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server up on ${CONFIG.port}`);
});

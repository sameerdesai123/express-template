require('dotenv').config();

const CONFIG = {};

CONFIG.port = process.env.PORT || 3000;
CONFIG.APP_ENV = process.env.NODE_ENV || 'development';

CONFIG.DB_URL = process.env.DB_URL || '127.0.0.1';
CONFIG.DB_NAME = process.env.DB_NAME || 'template';
CONFIG.DB_USERNAME = process.env.DB_USERNAME;
CONFIG.DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = CONFIG;

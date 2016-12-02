'use strict';

global.logger = require('log4js').getLogger();
global._ = require('lodash');
global.config = {
  timeout: process.env.TIMEOUT || 10000
};

const app = require('./application');
const http = require('http');
const log4js = require('log4js');

const server = http.Server(app);
const port = process.env.PORT || 9000;
server.listen(port, () => {
  // Config log level
  logger.setLevel(process.env.LOG_LEVEL || 'INFO');
  logger.info(`Server has been started at :${port}`);
});

process.on('uncaughtException', function (error) {
  if (!error.isOperational) {
    logger.fatal('UNCAUGHT EXCEPTION: ', error)
    process.exit(1);
  }
});

module.exports = server;

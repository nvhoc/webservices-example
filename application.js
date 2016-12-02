"use strict";


const express = require('express');
const async = require('async');
const app = express();
const middleware = require('swagger-express-middleware');
const compress = require('compression');

//compress
app.enable('trust proxy');
app.use(compress());

//stats
app.use(require('./middlewares/StatsD'));

//health check
app.get('/health/', (req, res, next) => {
  return res.json({ok: true, message: "I'm ok"})
});

//router
const public_router = require('./routes/public');

middleware('swagger.yaml', app, function (err, middleware) {
  if (err) {
    logger.error(err)
  }
  app.use(
    middleware.metadata(),
    middleware.parseRequest(),
    middleware.validateRequest()
  )

  app.use(function (err, req, res, next) {
    res.status(err.status).json(
      {
        error_code: 'validator',
        message: 'not match schema',
        stack_trace: err.message
      }
    );
  });

  app.use('/api/v1/public/tzc', public_router);

  //Handle error
  app.use(function (err, req, res, next) {
    logger.error(err.stack);
    res.status(500).json({ok: false, message: 'Something broke!'});
  });
})
module.exports = app

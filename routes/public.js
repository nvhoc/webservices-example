"use strict"
const express = require('express');
const router = express.Router();
const request = require('request');
const timeconvert = require('../utils/time');
const run = require('async-run').run;

router.get('/convert_current_time/:timezone', function (req, res) {
  const timezone = req.params.timezone;
  run(function *() {
    const body = yield timeconvert.getData();
    res.json({
      data: timeconvert.withData(body).in(timezone).exec()
    });
  }).catch((e) => {
    res.status(500).json({
      error_code: 'get_time',
      message: 'Can not get time from time.gov',
      stack_trace: e.message
    })
  });

});
module.exports = router;

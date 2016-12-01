const express = require('express');
const router = express.Router();

const timeconvert = require('../utils/time')

router.get('/convert_current_time/:timezone', function (req, res) {
  const timezone = req.params.timezone;
  res.json({
    data: new timeconvert().in(timezone).exec()
  });
});
module.exports = router;

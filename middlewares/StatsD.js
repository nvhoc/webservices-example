var StatsD = require('node-statsd');
var logger = require('log4js').getLogger()

var statsClient = new StatsD({
  host: process.env.NODE_LOCAL_IP || '127.0.0.1'
});

module.exports = (req, res, next) => {
  var startTime = new Date().getTime();
  res.once('finish', () => {
    var endTime = new Date().getTime();
    var duration = endTime - startTime;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`)
    try {
      statsClient.timing(`response.user_ads.${req.method}.${req.baseUrl + req.route.path.replace(/:(.*)\//,'<$1>/')}.${res.statusCode}`, duration)
    } catch (e) {
      logger.warn(`Wrong way access ${req.method} ${req.originalUrl}`)
    }
  })
  next()
};

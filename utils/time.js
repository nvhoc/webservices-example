const request = require('request');
class time {
  constructor(time) {
    this.time = time;
    this.now  = new Date(time);
    this.hours = this.now.getHours();
    this.timezone = '';
    return this;
  }
  static getData(){
    return new Promise((resolve, reject) => {
      request.get({url: 'http://time.gov/actualtime.cgi', timeout: config.timeout},function (error, response, body) {
        if (error){
          reject(error);
        }
        resolve(body);
      })
    })
  }

  static withData(data){
    if (!data)
      throw new Error('can not get data from time.gov');
    const regex = data.match('time=\"(.*)\" delay');
    if (regex<1){
      throw new Error('can not parse data from time.gov');
    }
    return new time(parseInt(regex[1])/1000);
  }

  in(timezone) {
    this.now.setHours(this.hours + parseInt(timezone));
    if (timezone == 0)
      return this;
    const plus = (timezone > 0)
      ? '+'
      : '-';
    this.timezone = `${plus}${("0" + timezone).slice(-2)}:00`;
    return this;
  }

  exec() {
    return this.now.toUTCString() + this.timezone;
  }
}
module.exports = time;
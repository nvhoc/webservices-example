class time {
  constructor() {
    this.now = new Date();
    this.hours = this.now.getHours();
    this.timezone = '';
    return this;
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
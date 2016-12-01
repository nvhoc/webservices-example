const should = require("should");
const time = require('../utils/time');
const assert = require('assert');
describe("Util Time test", function () {

  it("Convert timezone 0", function (done) {
    const result = Math.round(new Date(new time().in(0).exec())/1000);
    const nowInZone0 = Math.round(new Date(new Date().toUTCString()));
    assert(result, nowInZone0);
    done();
  });
  it("Convert current timezone", function (done) {
    const timezone = -Math.round(new Date().getTimezoneOffset() / 60);
    const result = Math.round(new Date(new time().in(timezone).exec())/1000);
    const nowInZone = Math.round(new Date()/1000);
    assert(result, nowInZone);
    done();
  });
});





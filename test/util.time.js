const should = require("should");
const time = require('../utils/time');
const assert = require('assert');
const run = require('async-run').run;

describe("Util Time test", function () {

  it("Convert timezone 0", function (done) {
    run(function* (){
      const body = yield time.getData();
      const timeIns = time.withData(body);
      const result = Math.round(new Date(timeIns.in(0).exec())/1000);
      const nowInZone0 = timeIns.time;
      assert.equal(result, nowInZone0);
      done();
    }).catch((e) => {
      assert.equal(e, null);
      done();
    })


  });
  it("Convert current timezone", function (done) {
    run(function* (){
      const body = yield time.getData();
      const timeIns = time.withData(body);
      const timezone = -Math.round(new Date().getTimezoneOffset() / 60);
      const result = Math.round(new Date(timeIns.in(timezone).exec())/1000);
      const nowInZone = Math.round(new Date(timeIns.time)/1000);
      assert.equal(result, nowInZone);
      done();
    }).catch((e) => {
      assert.equal(e, null);
      done();
    })
  });
});





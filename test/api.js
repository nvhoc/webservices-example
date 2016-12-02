const supertest = require("supertest");
const should = require("should");
const app = require('../server');
const server = supertest.agent("http://localhost:" + (process.env.PORT || 9000));

describe("API Unit test", function () {

  it("Should return health check", function (done) {
    server.get("/health").expect("Content-type", /json/).expect(200).end(function (err, res) {
      res.body.ok.should.equal(true)
      done();
    });
  });
  it("Check for wrong url", function (done) {
    server.get('/api/v1/public/test').expect("Content-type", /json/).end(function (err, res) {
      res.status.should.equal(404)
      done();
    });
  });
});

describe('Public API test', function () {

  describe('Convert Current Time', function () {
    describe('Validate params', function () {
      it("not over 12", function (done) {
        server.get('/api/v1/public/tzc/convert_current_time/13').expect("Content-type", /json/).end(function (err, res) {
          res.status.should.equal(400)
          done();
        });
      });
      it("not below -12", function (done) {
        server.get('/api/v1/public/tzc/convert_current_time/-13').expect("Content-type", /json/).end(function (err, res) {
          res.status.should.equal(400)
          done();
        });
      });
      it("not string abc", function (done) {
        server.get('/api/v1/public/tzc/convert_current_time/abc').expect("Content-type", /json/).end(function (err, res) {
          res.status.should.equal(400)
          done();
        });
      });
    })
    describe('Get current time zone', function () {
      it("timezone in 1", function (done) {
        const startTime = new Date();
        server.get('/api/v1/public/tzc/convert_current_time/1').expect("Content-type", /json/).end(function (err, res) {
          const endTime = new Date();
          if (endTime - startTime > config.timeout)
            res.status.should.equal(500);
          else
            res.status.should.equal(200);
          done();
        });
      });
    });
  })

})



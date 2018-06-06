'use strict';
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var request = require('supertest');

chai.use(chaiHttp);


describe('Pagina Principal', function() {
    it('Check Status 200', function (done) {
      request(server).get('/')
        .expect(200)
        .expect(/Welcome to PicApp web services./, done)
    });

    // it('Check Status 200', function (done) {
    //     request(server)
    //     .post('/api/user/super')
    //     .set('content-type', 'application/json')
    //     .send({"username": "superuser",
    //       "password": "steelsoft",
    //       "id": "0",
    //       "_rev": "asd",
    //       "applicationOwner": "grupo3"})
    //     .end(function (err, res) {
    //         res.should.have.status(200);
    //         done();
    //         });
    //     });

      /*it('Check Status 200', function (done) {
          chai.request(server)
              .get('/api/users')
              .end(function (err, res) {
                  res.should.have.status(200);
                  done();
              });
          });


        it('Check Status 200', function (done) {
            chai.request(server)
            .post('/api/user/super')
            .set('content-type', 'application/json')
            .send({"username": "superuser",
              "password": "steelsoft",
              "id": "0",
              "_rev": "asd",
              "applicationOwner": "grupo3"})
            .end(function (err, res) {
                res.should.have.status(200);
                done();
                });
            });
            */
});

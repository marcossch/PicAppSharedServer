'use strict';
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var user = require('../server/controllers/users');
var should = chai.should();

chai.use(chaiHttp);


describe('-----------------Pagina Principal-----------------', () => {
    it('Get a la pagina principal tiene status code 200', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

    it('Get a la pagina principal devuelve: Welcome to PicApp web services.', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.body.message.should.equal('Welcome to PicApp web services.');
                done();
            });
        });
});


describe('-----------------Modulo USERS-----------------', () => {
    it('Get de todos los usuarios tiene status 200', (done) => {
        chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
        });

/*
    it('Post mediante superuser tiene status 200', (done) => {
        chai.request(server)
            .post('/api/user/super')
            .set('content-type', 'application/json')
            .send({"username": "superuser",
                  "password": "steelsoft",
                  "id": "0",
                  "_rev": "asd",
                  "applicationOwner": "grupo3"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
              });
        });

        */

});

process.env.NODE_ENV = 'test';
'use strict'

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

var app = require('../app');

describe('Testing USERS', function() {


    it('Post SuperUser', function(){
        chai.request(server)
            .post('/api/user/super')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
            .end(function (err,res) {
                res.should.have.status(200);
                done();
            });
        });

    it('Token SuperUser', function(){
        chai.request(server)
            .post('/api/token')
            .send({username: 'superuser', password: 'steelsoft'})
            .set('content-type', 'application/x-www-form-urlencoded')
            .end((err, res) => {
                res.should.have.status(200);
                done();
                //Token user:331864634
            });
          });

    it('Post Server', function(){
        chai.request(server)
            .post('/api/servers/?BusinessToken=331864634')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({name: 'superserver', id: 0, _rev: 'asd', createdBy: 'superuser', createdTime: 0, lastConnection: 0})
            .end(function (err,res) {
                res.should.have.status(200);
                done();
            });
        });


/*    it('Get by Username: Superuser', (done) => {
        chai.request(server)
            .get('/api/users/:superuser')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });*/


    /*   it('Get all users', (done) => {
        chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });*/
});

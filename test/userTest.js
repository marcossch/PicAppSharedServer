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
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
            .end((err, res) => {

                res.should.have.status(200);
                done();
            });
        });
    
    it('Get all users', (done) => {
        chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
});

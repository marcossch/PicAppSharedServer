process.env.NODE_ENV = 'test';
'use strict'

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

var app = require('../app.js');

describe('Testing USERS', function() {

    /*it('Get all users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });*/
});

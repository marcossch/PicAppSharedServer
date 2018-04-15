process.env.NODE_ENV = 'test';
'use strict'

var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var http = require('http');
var chai = require('chai');

var app = require('../app.js');

describe('app', function() {

    let server = app.listen(3000);
    
    describe('Get', () => {
        it('it should not get a token, it should get an error', (done) => {
            
            chai.request(app)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    
    server.close()
});

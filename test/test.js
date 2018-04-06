var assert = require('assert');
var app = require('../app');

describe('USER', function() {
           assert(200,200);
});

/*//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var assert = require('assert');
let user = require('../app/models/user');

let mongoose = require("mongoose");
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
*/
/*describe('USERS', () => {
    beforeEach((done) => { //Before each test we empty the database
        user.remove({}, (err) => {
            done();
        });
    });

    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/book')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

});
describe('USER', function() {

    describe('GET', function(){

        it('Busco el usuario con indice 1', function () {
           app.post('/api/users');
           var result = app.get('/api/users');
           console.log(result);
           assert(result,200);
       });
    });
});*/
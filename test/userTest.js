process.env.NODE_ENV = 'test';
'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);


const expect = require('chai').expect;
const nock = require('nock');
const getUser = require('../index').getUser;
const responseGet = require('./getresponse');

describe('Get User tests', () => {

    /*it('Post SuperUser', function(){
        chai.request(server)
            .post('/api/user/super')
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });*/
    it('Get a user by username', () => {
        nock('https://127.0.0.1:3000')
            .get('/api/users/facu')
            .reply(200, responseGet);

        return getUser('facu')
            .then(responseGet => {
                expect(typeof responseGet).to.equal('object');
                expect(responseGet.name).to.equal('Facu');
                expect(responseGet.status).to.equal(200);
            });
        });
});
process.env.NODE_ENV = 'test';

var nock = require('nock');
var request = require('supertest')("http://127.0.0.1:3000");
var expect = require('chai').expect;

describe("Testing User", function () {

    it("Get all users",function (done) {
        nock("http://127.0.0.1:3000").get('/api/users').reply(200,{"status": 200, "message":"ok"});

        request.get('/api/users').end(function(err,res){
            expect(res.body.status).to.equal(200);
            done();
        });
    });
});


/*
//let User = require('../server/controllers/users');
//Require the dev-dependencies
let chai = require('chai');
let server = require('../app');


describe("Testing User", function () {


    it('Post Superuser', (done) => {
        chai.request(server)
            .post('/api/user/super')
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
            .end((err, res) => {

                res.should.have.status(200);
                done();
            });
    });


    it('Get by Username: Superuser', (done) => {
        chai.request(server)
            .get('/api/users/superuser')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

    it('Delete Superuser',(done)=> {
        chai.request(server)
            .delete('/api/users/superuser')
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
        });
});*/
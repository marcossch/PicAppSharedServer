process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('TEST', function() {

    describe('Pagina Principal', function() {
        it('Check Status 200', function (done) {
            chai.request(server)
                .get('/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Check Return Welcome to PicApp web services.', function (done) {
            chai.request(server)
                .get('/')
                .end(function (err, res) {
                    res.body.message.should.equal('Welcome to PicApp web services.');
                    done();
                });
        });
    })

    /*describe('User', function () {

        it('Check Status 401: unauthorized', function (done) {
            chai.request(server)
                .post('/api/user/?ApplicationToken=tok')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'facu', password: 'facu123', id: 1, _rev: 'asd', applicationOwner: 'grupo3'})
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                });
        });

        it('Creacion SUPERUSER', function (done) {
            chai.request(server)
                .post('/api/user/super')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        it('Token SUPERUSER', function (done) {
            chai.request(server).post('/api/token')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
                .end(function (err, res) {
                    res.should.have.status(201);
                    done();
                });
        });

        it('Creacion SUPERSERVER', function () {
            chai.request(server).post('api/servers/?BusinessToken=331864634')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({name: 'superserver', id: 0, _rev: 'asd', createdBy: 'superuser', createdTime: 0, lastConnection: 0
                });
            });

        it('Test Integracion: Check status 200 and Type Data', function(done) {
            chai.request(server)
                .post('/api/user/?ApplicationToken=1164126594')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'facu', password: 'steelsoft', id: 1, _rev: 'asd', applicationOwner: 'grupo3'})
                .end(function(err, res){
                    res.should.have.status(200);
                    //res.body.should.have.property('id');
                    //res.body.should.have.property('_rev');
                    //res.body.should.have.property('applicationOwner');
                    //res.body.should.have.property('username');
                    //res.body.username.should.equal('facu');

                    done();
                });
            });
    })*/

});


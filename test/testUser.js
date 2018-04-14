process.env.NODE_ENV = 'test';

const request = require('superagent');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Test para User', function() {

    beforeEach(function (done) {

    });

    describe('Testeo Crear Usuario: Post /api/user', function () {

        /*it('Check Status 401: unauthorized', function (done) {
            chai.request(server)
                .post('/api/user/?ApplicationToken=tok')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'facu', password: 'facu123', id: 1, _rev: 'asd', applicationOwner: 'grupo3'})
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                });
            });
        });*/
    });
});

    /*it('Test Integracion: Check status 200 and Type Data', function(done) {
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
        });*/
        /*
        it('Check Status 400: Parametros incorrectos, username repetido', function(done) {
            chai.request(server)
                .put('/api/user/QUERY')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username:'facu',password:'facu123',id:0,_rev:'asd',applicationOwner:'yo'})
                .end(function(err, res){
                    res.should.have.status(200);
                    done();
                });
            });

        it('Check Status 400: parametro Faltante', function(done) {
            chai.request(server)
                .put('/api/user/QUERY')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({password:'facu123',id:0,_rev:'asd',applicationOwner:'yo'})
                .end(function(err, res){
                    res.should.have.status(200);
                    done();
                });
            });*/


    /*describe('Testeo Obtener Usuarios: Get /api/users/',function() {

        it('Chequeo Status 200', function (done) {
            chai.request(server)
                .get('/api/users/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
            });

    });

    describe('Testeo Obtener Usuarios: Get /api/users/:username',function() {

        it('Test Integracion: Chequeo Status 200 and Type data', function (done) {
            chai.request(server)
                .get('/api/users/:facu')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('id');
                    res.body.should.have.property('_rev');
                    res.body.should.have.property('applicationOwner');
                    res.body.should.have.property('username');
                    done();
                });
            });

        it('Chequeo Status 404 User not Found', function (done) {
            chai.request(server)
                .get('/api/users/:marc')
                .end(function (err, res) {
                    res.should.have.status(404);
                    done();
                });
            });

        it('Chequeo Status 400 Parametros Invalidos', function (done) {
            chai.request(server)
                .get('/api/users/')
                .end(function (err, res) {
                    res.should.have.status(400);
                    done();
                });
            });

    });

    describe('Testeo Crear Usuario: Put /api/user',function(){

        it('Test Integracion: Check Status 200 y Cambio de contraseña', function(done) {
            chai.request(server)
                .put('/api/users/QUERY')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({password:'facuk-po'})
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.password.should.equal('facuk-po');
                    done();
                });
        });

        it('Check Status 404: Usuario no encontrado', function(done) {
            chai.request(server)
                .put('/api/user/QUERY')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username:'facu',password:'facu123',id:0,_rev:'asd',applicationOwner:'yo'})
                .end(function(err, res){
                    res.should.have.status(200);
                    done();
                });
        });

    });
*/



/* COSAS PROBADAS PARA BEFORE:

chai

       chai.request(server)
            .post('/api/user/super')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
            .end(function (err,res) {
                if(res.should.have.status(200)){console.log("SUPERUSER perfecto")};
            });
        chai.request(server)
            .post('/api/token')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'superuser'})
            .end(function (err,res) {
                if(res.should.have.status(200)){console.log("SUPERUSER perfecto")};
            });
        chai.request(server)
            .post('/api/servers/?BusinessToken=331864634')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({name: 'superserver', id: 0, _rev: 'asd', createdBy: 'superuser', createdTime: 0, lastConnection: 0})
            .end(function (err,res) {
                if(res.should.have.status(200)){console.log("SUPERSERVER perfecto")};
                done();
            });


https

        var options = {
            hostname: 'localhost',
            port: 5432,
            path: '/api/user/super',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body:{
                username: 'superuser',
                password: 'steelsoft',
                id: 0,
                _rev: 'asd',
                applicationOwner: 'grupo3'
            }
        };

        var req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
              });
            });


superagent

        request
            .post('127.0.0.1:3000/api/user/super')
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
            .set('X-API-Key', 'foobar')
            .set('accept', 'json')
            .end((err, res) => {
                console.log(res);
                done();
            });
 */
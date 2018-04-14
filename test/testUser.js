process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe("Creacion y Destruccion",function() {
    before(function () {
        /*Creacion de entorno para pruebas*/
        chai.request(server).post('/api/user/super/?key=steelsoft')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'});
        chai.request(server).post('api/token')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'superuser'});
        chai.request(server).post('api/servers/?BusinessToken=331864634')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({name: 'superserver', id: 0, _rev: 'asd', createdBy: 'superuser', createdTime: 0, lastConnection: 0});
        /*Listo del entorno para pruebas*/
    });
});
/*
    after(function () {
        /*Destruccion de entorno para pruebas*
        chai.request(server).delete('api/servers/?BusinessToken=331864634')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({name: 'superserver', id: 0, _rev: 'asd', createdBy: 'superuser', createdTime: 0, lastConnection: 0});
        chai.request(server).delete('/api/user')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'});
        /*Listo del entorno para pruebas*
    });
});*/

describe('Test para User', function() {


    describe('Testeo Crear Usuario: Post /api/user',function(){

        before(function () {
            /*Creacion de entorno para pruebas*/
            chai.request(server).post('/api/user/super/?key=steelsoft')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'superuser', password: 'steelsoft', id: 0, _rev: 'asd', applicationOwner: 'grupo3'})
                .end(function(err,res){
                    res.should.have.status(200);
                });
            chai.request(server).post('api/token')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'superuser'});
            chai.request(server).post('api/servers/?BusinessToken=331864634')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({name: 'superserver', id: 0, _rev: 'asd', createdBy: 'superuser', createdTime: 0, lastConnection: 0});
            /*Listo del entorno para pruebas*/
        });


        it('Check Status 401: unauthorized', function(done) {
            chai.request(server)
                .post('/api/user/?ApplicationToken=tok')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({username: 'facu', password: 'facu123', id: 1, _rev: 'asd', applicationOwner: 'grupo3'})
                .end(function(err, res){
                    res.should.have.status(401);
                    done();
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

    });

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

});


/* por las du:
"creacion": "superu && supert && supers",
    "superu":"curl --data 'username=superuser&password=steelsoft&id=0&_rev=asd&applicationOwner=grupo3' 127.0.0.1:3000/api/user/super/?key=steelsoft",
    "supert":"curl --data 'username=superuser' 127.0.0.1:3000/api/token",
    "supers":"curl --data 'name=superserver&id=0&_rev=asd&createdBy=superuser&createdTime=0&lastConnection=0' 127.0.0.1:3000/api/servers/?BusinessToken=331864634"

 */
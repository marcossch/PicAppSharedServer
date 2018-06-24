'use strict';
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
//var user = require('../server/controllers/users');
var should = chai.should();

chai.use(chaiHttp);
var req;

describe('-----------------Pagina Principal-----------------', () => {
    it('Get a la pagina principal tiene status code 200', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

    it('Get a la pagina principal devuelve: Welcome to PicApp web services', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.body.message.should.equal('Welcome to PicApp web services.');
                done();
            });
        });
});


describe('-----------------Modulo USERS-----------------', () => {

    it('Get de todos los usuarios tiene status 200', (done) => {
        chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
        });

    it('Post mediante superuser tiene status 200', (done) => {
        chai.request(server)
            .post('/api/user/super')
            .set('content-type', 'application/json')
            .send({"username": "superuser",
                  "password": "steelsoft",
                  "id": "0",
                  "_rev": "asd",
                  "applicationOwner": "grupo3"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
              });
        });

    it('Validar el token de un usuario inexistente tiene status 404', (done) => {
        chai.request(server)
            .post('/api/token')
            .set('content-type', 'application/json')
            .send({"username": "pepe"})
            .end((err, res) => {
                res.should.have.status(404);
                done();
              });
        });

    it('Validar el token de superuser tiene status 200', (done) => {
        chai.request(server)
            .post('/api/token')
            .set('content-type', 'application/json')
            .send({"username": "superuser"})
            .end((err, res) => {
                res.should.have.status(201);
                done();
              });
        });

    it('Get al usuario creado anteriormente tiene status 200', (done) => {
        chai.request(server)
            .get('/api/users/superuser')
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
        });

    it('Delete al usuario creado anteriormente tiene status 204', (done) => {
        chai.request(server)
            .delete('/api/users/superuser')
            .end((err, res) => {
                res.status.should.equal(204);
                done();
            });
        });

    it('Get al usuario borrado anteriormente tiene status 404', (done) => {
        chai.request(server)
            .get('/api/users/superuser')
            .end((err, res) => {
                res.status.should.equal(404);
                done();
            });
        });

    it('Post mediante superuser sin pass tiene status 400', (done) => {
        chai.request(server)
            .post('/api/user/super')
            .set('content-type', 'application/json')
            .send({"username": "sinPass",
                  "id": "0",
                  "_rev": "asd",
                  "applicationOwner": "grupo3"})
            .end((err, res) => {
                res.should.have.status(400);
                done();
              });
        });

    it('Post mediante superuser sin id tiene status 400', (done) => {
        chai.request(server)
            .post('/api/user/super')
            .set('content-type', 'application/json')
            .send({"username": "sinPass",
                  "password": "0",
                  "_rev": "asd",
                  "applicationOwner": "grupo3"})
            .end((err, res) => {
                res.should.have.status(400);
                done();
              });
        });
});


describe('-----------------Modulo SERVER-----------------', () => {

  it('Post mediante superuser tiene status 200', (done) => {
      chai.request(server)
          .post('/api/user/super')
          .set('content-type', 'application/json')
          .send({"username": "superuser",
                "password": "steelsoft",
                "id": "0",
                "_rev": "asd",
                "applicationOwner": "grupo3"})
          .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });

  it('Validar el token de superuser tiene status 200', (done) => {
    chai.request(server)
        .post('/api/supertoken')
        .set('content-type', 'application/json')
        .send({"username": "superuser"})
        .end((err, res) => {
            res.should.have.status(201);
            done();
          });
    });
    /*ACA EMPEZAMOS A PROBAR EL MODULO SERVER*/

    it('Creacion del server con token incorrecto tiene status 401', (done) => {
      req = {query:{BusinessToken:"123"}};
      chai.request(server)
          .post('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .send(req)
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

    it('Creacion del server con parametros incorrectos tiene status 400', (done) => {
      req = {query:{
                  BusinessToken:9081726354
                },
             body:{
                  name:"superserver",
                  id:0
                }
              }
      chai.request(server)
          .post('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send(req)
          .end((err, res) => {
              console.log(res.body);
              res.should.have.status(400);
              done();
            });
      });

    /*ACA TERMINAMOS A PROBAR EL MODULO SERVER*/
  it('Delete al usuario creado anteriormente tiene status 204', (done) => {
      chai.request(server)
          .delete('/api/users/superuser')
          .end((err, res) => {
              res.status.should.equal(204);
              done();
          });
      });


});

describe('-----------------Modulo FILES-----------------', () => {

  it('Post mediante superuser tiene status 200', (done) => {
      chai.request(server)
          .post('/api/user/super')
          .set('content-type', 'application/json')
          .send({"username": "superuser",
                "password": "steelsoft",
                "id": "0",
                "_rev": "asd",
                "applicationOwner": "grupo3"})
          .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });

  it('Validar el token de superuser tiene status 200', (done) => {
    chai.request(server)
        .post('/api/supertoken')
        .set('content-type', 'application/json')
        .send({"username": "superuser"})
        .end((err, res) => {
            res.should.have.status(201);
            done();
          });
    });
    /*ACA EMPEZAMOS A PROBAR EL MODULO FILES*/

    it('Creacion de un file con token incorrecto tiene status 401', (done) => {
      req = {query:{BusinessToken:"123"}};
      chai.request(server)
          .post('/api/files')
          .set('content-type', 'application/json')
          .send(req)
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

    /*it('Creacion de un file con parametros incorrectos tiene status 400', (done) => {
      let req = {query:{BusinessToken:"9081726354"}};
      chai.request(server)
          .post('/api/files')
          .set('content-type', 'application/json')
          .send(req)
          .end((err, res) => {
              res.should.have.status(400);
              done();
            });
      });*/


    /*ACA TERMINAMOS A PROBAR EL MODULO FILES*/
  it('Delete al usuario creado anteriormente tiene status 204', (done) => {
      chai.request(server)
          .delete('/api/users/superuser')
          .end((err, res) => {
              res.status.should.equal(204);
              done();
          });
      });


});

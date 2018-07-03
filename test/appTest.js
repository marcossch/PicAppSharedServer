'use strict';
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
//var user = require('../server/controllers/users');
var should = chai.should();

chai.use(chaiHttp);

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

    it('Get a usuario inexistente tiene status 404', (done) => {
        chai.request(server)
            .get('/api/users/pepe')
            .end((err, res) => {
                res.status.should.equal(404);
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

    it('Post mediante superuser con el mismo id tiene status 400', (done) => {
        chai.request(server)
            .post('/api/user/super')
            .set('content-type', 'application/json')
            .send({"username": "superuser2",
                  "password": "steelsoft",
                  "id": "0",
                  "_rev": "asd",
                  "applicationOwner": "grupo3"})
            .end((err, res) => {
                res.should.have.status(400);
                done();
              });
        });

    it('Post mediante superuser tiene status 200', (done) => {
        chai.request(server)
            .post('/api/user/super')
            .set('content-type', 'application/json')
            .send({"username": "superuser2",
                  "password": "steelsoft",
                  "id": "1",
                  "_rev": "asd",
                  "applicationOwner": "grupo3"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
              });
        });

    it('Get de todos los usuarios tiene status 200 y longitud 2', (done) => {
        chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.length.should.equal(2);
                done();
            });
        });

    it('Delete al usuario superuser2 tiene status 204', (done) => {
        chai.request(server)
            .delete('/api/users/superuser2')
            .end((err, res) => {
                res.status.should.equal(204);
                done();
            });
        });

    it('Delete a usuario inexistente tiene status 404', (done) => {
        chai.request(server)
            .delete('/api/users/pepe')
            .end((err, res) => {
                res.status.should.equal(404);
                done();
            });
        });

    it('Get de todos los usuarios tiene status 200 y longitud 1', (done) => {
        chai.request(server)
            .get('/api/users/')
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.length.should.equal(1);
                done();
            });
        });

    it('Put para actualizar usuario inexistente tiene status 404', (done) => {
        chai.request(server)
            .put('/api/users/pepe')
            .set('content-type', 'application/json')
            .end((err, res) => {
                res.should.have.status(404);
                done();
              });
        });

    it('Put para actualizar usuario tiene status 200', (done) => {
        chai.request(server)
            .put('/api/users/superuser')
            .set('content-type', 'application/json')
            .send({"password": "robin",
                  "_rev": "kaka"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
              });
        });

    it('Delete al usuario superuser tiene status 204', (done) => {
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

  it('Post mediante supertoken de superuser tiene status 200', (done) => {
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

    it('Post a creacion del server con token incorrecto tiene status 401', (done) => {
      chai.request(server)
          .post('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

    it('Post a creacion del server con parametros incorrectos tiene status 400', (done) => {
      chai.request(server)
          .post('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({
               "name":"superserver",
               "id":0
             })
          .end((err, res) => {
              res.should.have.status(400);
              done();
            });
      });

    it('Post a creacion del server con parametros correctos tiene status 201', (done) => {
      chai.request(server)
          .post('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"name":"superserver",
                 "id":0,
                 "_rev":"1.0",
                 "createdBy":"grupo3"
                })
          .end((err, res) => {
              res.should.have.status(201);
              done();
            });
      });

    it('Post a creacion del server con parametros incorrectos ( iguales al anterior ) tiene status 400', (done) => {
      chai.request(server)
          .post('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"name":"superserver",
                 "id":0,
                 "_rev":"1.0",
                 "createdBy":"grupo3"
                })
          .end((err, res) => {
              res.should.have.status(400);
              done();
            });
      });

    it('Get del server recientemente creado con token invalido tiene status 401', (done) => {
      chai.request(server)
          .get('/api/servers/0')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

      it('Get del server recientemente creado con id invalido tiene status 400', (done) => {
        chai.request(server)
            .get('/api/servers/10')
            .set('content-type', 'application/json')
            .query({BusinessToken:"9081726354"})
            .end((err, res) => {
                res.should.have.status(404);
                done();
              });
        });

    it('Get del server recientemente creado tiene status 200', (done) => {
      chai.request(server)
          .get('/api/servers/0')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });

    it('Get de todos los servers con token invalido tiene status 401', (done) => {
      chai.request(server)
          .get('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

    it('Get de todos los servers tiene status 200', (done) => {
      chai.request(server)
          .get('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });

    it('Post a validacion del server con token incorrecto tiene status 401', (done) => {
      chai.request(server)
          .post('/api/servers/12')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

    it('Post a validacion del server con id incorrecto tiene status 404', (done) => {
      chai.request(server)
          .post('/api/servers/12')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(404);
              done();
            });
      });

    it('Post a validacion del server con id incorrecto tiene status 201', (done) => {
      chai.request(server)
          .post('/api/servers/0')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(201);
              done();
            });
      });


    it('Post a creacion del server con parametros correctos tiene status 201', (done) => {
      chai.request(server)
          .post('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"name":"superserver2",
                 "id":1,
                 "_rev":"1.0",
                 "createdBy":"grupo3"
                })
          .end((err, res) => {
              res.should.have.status(201);
              done();
            });
      });

    it('Get de todos los servers tiene status 200 y longitud 2', (done) => {
      chai.request(server)
          .get('/api/servers')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(200);
              res.body.length.should.equal(2);
              done();
            });
      });


    it('Delete del server con token incorrecto tiene status 401', (done) => {
      chai.request(server)
          .delete('/api/servers/0')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

    it('Delete del server con id incorrecto tiene status 404', (done) => {
      chai.request(server)
          .delete('/api/servers/12')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(404);
              done();
            });
      });

    it('Delete del server tiene status 200', (done) => {
      chai.request(server)
          .delete('/api/servers/0')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });

    it('Get del server recientemente borrado tiene status 404', (done) => {
      chai.request(server)
          .get('/api/servers/0')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(404);
              done();
            });
      });

    it('Put a actualizacion del server con token incorrecto tiene status 401', (done) => {
      chai.request(server)
          .put('/api/servers/1')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

    it('Put a actualizacion del server con id incorrecto tiene status 404', (done) => {
      chai.request(server)
          .put('/api/servers/12')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(404);
              done();
            });
      });

    it('Put a actualizacion del server con token correcto tiene status 200', (done) => {
      chai.request(server)
          .put('/api/servers/1')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"name":"super"
                })
          .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });

    it('Delete del server tiene status 200', (done) => {
      chai.request(server)
          .delete('/api/servers/1')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(200);
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

    it('Post mediante supertoken de superuser tiene status 200', (done) => {
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

    it('Post a creacion de un file con token incorrecto tiene status 401', (done) => {
      chai.request(server)
          .post('/api/files')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });


    it('Post a creacion de un file con parametros incorrectos tiene status 400', (done) => {
      chai.request(server)
          .post('/api/files')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"name":"superfile"})
          .end((err, res) => {
              res.should.have.status(400);
              done();
            });
      });

    it('Post a creacion de un file tiene status 201', (done) => {
      chai.request(server)
          .post('/api/files')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"filename":"superfile",
                 "id":"a",
                 "_rev":"asd",
                 "size":1,
                 "resource":"deporhay"
                })
          .end((err, res) => {
              res.should.have.status(201);
              done();
            });
      });

    it('Get de todos los file con token incorrecto tiene status 401', (done) => {
      chai.request(server)
          .get('/api/files')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

    it('Get del file con token incorrecto tiene status 401', (done) => {
      chai.request(server)
          .get('/api/files/a')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

      it('Get del file con id incorrecto tiene status 404', (done) => {
        chai.request(server)
            .get('/api/files/b')
            .set('content-type', 'application/json')
            .query({BusinessToken:"9081726354"})
            .end((err, res) => {
                res.should.have.status(404);
                done();
              });
        });

    it('Get del file tiene status 200', (done) => {
      chai.request(server)
          .get('/api/files/a')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });

    it('Post a creacion de un file con los mismos parametros tiene status 400', (done) => {
      chai.request(server)
          .post('/api/files')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"filename":"superfile",
                 "id":"a",
                 "_rev":"asd",
                 "size":1,
                 "resource":"deporhay"
                })
          .end((err, res) => {
              res.should.have.status(400);
              done();
            });
      });

    it('Post a creacion de un file tiene status 201', (done) => {
      chai.request(server)
          .post('/api/files')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"filename":"superfile2",
                 "id":"b",
                 "_rev":"asd",
                 "size":1,
                 "resource":"deporhay"
                })
          .end((err, res) => {
              res.should.have.status(201);
              done();
            });
      });

    it('Delete del file con token incorrecto tiene status 401', (done) => {
      chai.request(server)
          .get('/api/files/a')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

      it('Delete del file tiene status 404', (done) => {
        chai.request(server)
            .delete('/api/files/z')
            .set('content-type', 'application/json')
            .query({BusinessToken:"9081726354"})
            .end((err, res) => {
                res.should.have.status(404);
                done();
              });
        });

    it('Delete del file tiene status 204', (done) => {
      chai.request(server)
          .delete('/api/files/b')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .end((err, res) => {
              res.should.have.status(204);
              done();
            });
      });

    it('Put a update de un file con token incorrecto tiene status 401', (done) => {
      chai.request(server)
          .put('/api/files/a')
          .set('content-type', 'application/json')
          .query({BusinessToken:"123"})
          .send({"filename":"superfile2",
                 "id":"b",
                 "_rev":"asd",
                 "size":1,
                 "resource":"deporhay"
                })
          .end((err, res) => {
              res.should.have.status(401);
              done();
            });
      });

    it('Put a update de un file con id incorrecto tiene status 404', (done) => {
      chai.request(server)
          .put('/api/files/asad')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"filename":"superfile2",
                 "id":"b",
                 "_rev":"asd",
                 "size":1,
                 "resource":"deporhay"
                })
          .end((err, res) => {
              res.should.have.status(404);
              done();
            });
      });

    it('Put a update de un file tiene status 200', (done) => {
      chai.request(server)
          .put('/api/files/a')
          .set('content-type', 'application/json')
          .query({BusinessToken:"9081726354"})
          .send({"filename":"file",
                 "id":"c",
                 "_rev":"asd",
                 "size":1,
                 "resource":"deporhay"
                })
          .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });


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

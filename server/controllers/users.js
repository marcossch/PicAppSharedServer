const User = require('../models').User;
const Server = require('../models').Server;

module.exports = {
    create: function (req, res) {

        //se valida la ApiKey
        Server.find({
            where: {token: req.query.ApplicationToken}
        })
            .then(server => {
                if (!server) {
                    return res.status(401).send({
                        code: '401',
                        message: 'Unauthorized',
                    });
                }
                else {

                    //si el ApiKey se valido entonces se crea el usuario

                    User.create({
                        name: req.body.username,
                        password: req.body.password,
                        id: req.body.id,
                        ref: req.body._rev,
                        applicationOwner: req.body.applicationOwner,
                    })
                        .then(user => res.status(200).json({
                            metadata: {
                                version: "1.0"
                            },
                            user: {
                                id: user.id,
                                _rev: user.ref,
                                applicationOwner: user.applicationOwner,
                                username: user.name
                            }
                        }))
                        .catch(error => {
                            res.status(400).send({
                                code: '400',
                                message: "Incumplimiento de precondiciones " +
                                "(parámetros faltantes) o validación fallida", error
                            })
                        });

                }
            })
            .catch(error => res.status(500).send({
                code: '500',
                message: 'Unexpected error',
                error}));

    },
    list(req, res) { //devuelve todos los usuarios
        return User
            .findAll()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(500).send({
                code: '500',
                message: "Unexpected error", error
            }));
    },
    retrieve(req, res) {
        return User
            .findByPrimary(req.params.username)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        code: '404',
                        message: 'User Not Found',
                    });
                }
                return res.status(200).json({
                    metadata: {
                        version: "1.0"
                    },
                    user: {
                        id: user.id,
                        _rev: user.ref,
                        applicationOwner: user.applicationOwner,
                        username: user.name
                    }
                });
            })
            .catch(error => res.status(400).send({
                code: '400',
                message: "Incumplimiento de precondiciones " +
                "(parámetros faltantes) o validación fallida", error
            }));
    },
    update(req, res) {
        return User
            .findByPrimary(req.params.username)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        code: '404',
                        message: 'User Not Found',
                    });
                }
                return user
                    //se puede actualizar cualquier cosa menos el nombre
                    //se pasa con los nombres de los parametros por el body
                    .update({
                        name: req.body.name || user.name,
                        ref: req.body._rev || user.ref,
                        password: req.body.password || user.password,
                    })
                    .then(() => res.status(200).json({
                        metadata: {
                            version: "1.0"
                        },
                        user: {
                            id: user.id,
                            _rev: user.ref,
                            applicationOwner: user.applicationOwner,
                            username: user.name
                        }
                    }))  // Send back the updated user.
                    .catch((error) => res.status(400).send({
                        code: '400',
                        message: "Incumplimiento de precondiciones " +
                        "(parámetros faltantes) o validación fallida", error
                    }));
            })
            .catch((error) => res.status(400).send({
                code: '400',
                message: "Incumplimiento de precondiciones " +
                "(parámetros faltantes) o validación fallida", error
            }));
    },
    destroy(req, res) {
        return User
            .findByPrimary(req.params.username)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        code: '404',
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send({
                        message: 'User deleted successfully.' }))
                    .catch(error => res.status(500).send({
                        code: '500',
                        message: "Unexpected error", error
                    }));
            })
            .catch(error => res.status(400).send({
                code: '400',
                message: "Incumplimiento de precondiciones " +
                "(parámetros faltantes) o validación fallida", error
            }));
    },
    validate: function (req, res) {
        return User
            .findByPrimary(req.body.username)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        code: '404',
                        message: 'User Not Found',
                    });
                }
                return user
                .update({token: hash(user.name)})
                .then(() => res.status(201).json({
                    metadata: {
                        version: "1.0"
                    },
                    token: {
                        expiresAt: Date.now() + + 2*24*60*60*1000,
                        token: user.token
                    }
                }))
                    .catch(error => {
                        res.status(500).send({code: '500', message:"Unexpected error", error})});
            })
                    .catch(error => {
                        res.status(400).send({code: '400',
                            message:"Incumplimiento de precondiciones " +
                            "(parámetros faltantes) o validación fallida", error})});
    },

    /*PRIVADO PARA PRUEBAS*/

    supercreate: function (req, res) {

        return User.create({
            name: req.body.username,
            password: req.body.password,
            id: req.body.id,
            ref: req.body._rev,
            applicationOwner: req.body.applicationOwner,
        })
          .then(user => res.status(200).json({
              metadata: {
                  version: "1.0"
              },
              user: {
                  id: user.id,
                  _rev: user.ref,
                  applicationOwner: user.applicationOwner,
                  username: user.name
              }
          }))
          .catch(error => {
              res.status(400).send({
                  code: '400',
                  message: "Incumplimiento de precondiciones " +
                  "(parámetros faltantes) o validación fallida", error
              })
          });
    },

    listAux: function(req) { //devuelve todos los usuarios
        let users = User.findAll();
            if(users){
              return {code: 200,
                      res: users};
            }
            return {code:500};
    }

};

//Funcion de hash simple para los tokens
function hash(str){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    var hash = 0;
    if (text.length == 0) return hash;
    for (i = 0; i < text.length; i++) {
        char = text.charCodeAt(i);		hash = ((hash<<5)-hash)+char;		hash = hash & hash; // Convert to 32bit integer
    }
    if (hash < 0) {
        hash = hash * -1;
    }
    return hash;
}

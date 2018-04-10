const Server = require('../models').Server;
const User = require('../models').User;

module.exports = {
    create: function (req, res) {

        //se valida la ApiKey
        User.find({
            where: {token: req.params.apiKey}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        code: '401',
                        message: 'Unauthorized',
                    });
                }
                else {

                    Server.create({
                name: req.body.username,
                id: req.body.id,
                ref: req.body._rev,
                createdBy: req.body.createdBy,
                createdAt: req.body.createdTime,
                updatedAt: req.body.lastConnection,
                token: hash(String(req.body.username)),

            })
                    .then(server => res.status(201).json({
                        metadata: {
                            version: "1.0"
                        },
                        server: {
                            server: {
                                id: server.id,
                                _rev: server.ref,
                                createdBy: server.createdBy,
                                createdTime: server.createdAt,
                                name: server.name,
                                lastConnection: server.updatedAt
                            },
                            token: {
                                expiresAt: 1000,
                                token: server.token
                            }
                        }
                    }))
                    .catch(error => {
                        res.status(400).send({code: '400',message:"Incumplimiento de precondiciones " +
                        "(parámetros faltantes) o validación fallida", error})
                    });
                }
            })
            .catch(error => res.status(500).send({code: '500', message:"Unexpected error", error}));
    },
    list(req, res) { //devuelve todos los usuarios

        // //se valida la ApiKey
         User.find({
             where: {token: req.params.apiKey}
         })
             .then(user => {
                 if (!user) {
                     return res.status(401).send({
                         code: '401',
                         message: 'Unauthorized',
                     });
                 }
                 else {

                    Server.findAll()
                    .then(server => res.status(200).send(server))
                    .catch(error => res.status(400).send({code: '400',message:"Incumplimiento de precondiciones " +
                        "(parámetros faltantes) o validación fallida", error}));
                 }
             })
             .catch(error => res.status(500).send({code: '500', message:"Unexpected error", error}));
    },
    retrieve(req, res) {

        //se valida la ApiKey
        User.find({
            where: {token: req.params.apiKey}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        code: '401',
                        message: 'Unauthorized',
                    });
                }
                else {


                    Server.findByPrimary(req.params.serverId)
                        .then(server => {
                            if (!server) {
                                return res.status(404).send({
                                    code: '404',
                                    message: 'Server Not Found',
                                });
                            }
                            return res.status(200).json({
                                metadata: {
                                    version: "1.0"
                                },
                                user: {
                                    id: server.id,
                                    _rev: server.ref,
                                    createdBy: server.createdBy,
                                    createdTime: server.createdAt,
                                    name: server.name,
                                    lastConnection: server.updatedAt
                                }
                            })
                        })
                        .catch(error => res.status(400).send({code: '400',message:"Incumplimiento de precondiciones " +
                            "(parámetros faltantes) o validación fallida", error}));
                }
            })
            .catch(error => res.status(500).send(error));
    },
    update(req, res) {

        //se valida la ApiKey
        User.find({
            where: {token: req.params.apiKey}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        message: 'Unauthorized',
                    });
                }
                else {


                    Server.findByPrimary(req.params.serverId)
                    .then(server => {
                        if (!server) {
                            return res.status(404).send({
                                message: 'Server Not Found',
                            });
                        }
                        return server
                        //solo se puede actualizar el nombre y el ref
                        //se pasa con los nombres de los parametros por el body
                            .update({
                                name: req.body.name || server.name,
                                ref: req.body._rev || server.ref,
                            })
                            .then(() => res.status(200).json({
                                metadata: {
                                    version: "1.0"
                                },
                                server: {
                                    server: {
                                        id: server.id,
                                        _rev: server.ref,
                                        createdBy: server.createdBy,
                                        createdTime: server.createdAt,
                                        name: server.name,
                                        lastConnection: server.updatedAt
                                    }
                                }
                            }))
                            .catch(error => {
                                res.status(400).send({code:'400',message:"Incumplimiento de precondiciones " +
                                    "(parámetros faltantes) o validación fallida", error})
                            });
                    })
                    .catch((error) => res.status(400).send({code:'400', message:"Incumplimiento de precondiciones " +
                        "(parámetros faltantes) o validación fallida", error}));
                }
            })
            .catch(error => res.status(500).send({code: '500', message:"Unexpected error", error}));
    },
    destroy(req, res) {

        //se valida la ApiKey
        User.find({
            where: {token: req.params.apiKey}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        code: '401',
                        message: 'Unauthorized',
                    });
                }
                else {

                    Server.findByPrimary(req.params.serverId)
                    .then(server => {
                        if (!server) {
                            return res.status(404).send({
                                code: '404',
                                message: 'Server Not Found',
                            });
                        }
                        return server
                            .destroy()
                            .then(() => res.status(200).send({ code:'200', message: 'Server deleted successfully.' }))
                            .catch(error => res.status(400).send({code:'400', message:"Incumplimiento de precondiciones " +
                                "(parámetros faltantes) o validación fallida", error}));
                    })
                    .catch(error => res.status(400).send({code:'400', message:"Incumplimiento de precondiciones " +
                        "(parámetros faltantes) o validación fallida", error}));
                }
            })
            .catch(error => res.status(500).send({code: '500', message:"Unexpected error", error}));
    },
    tokenReset: function (req, res) {

        //se valida la ApiKey
        User.find({
            where: {token: req.params.apiKey}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        code: '401',
                        message: 'Unauthorized',
                    });
                }
                else {

                    Server.findByPrimary(req.params.serverId)
                    .then(server => {
                        if (!server) {
                            return res.status(404).send({
                                code: '404',
                                message: 'Server Not Found',
                            });
                        }
                        return server
                            //aca hay que cambiar el token por otro
                            .update({token: hash(server.name)})
                            .then(() => res.status(201).json({
                                metadata: {
                                    version: "1.0"
                                },
                                server: {
                                    server: {
                                        id: server.id,
                                        _rev: server.ref,
                                        createdBy: server.createdBy,
                                        createdTime: server.createdAt,
                                        name: server.name,
                                        lastConnection: server.updatedAt
                                    },
                                    token: {
                                        expiresAt: 1000,
                                        token: server.token
                                    }
                                }
                            }))
                            .catch(error => {
                                res.status(400).send({code: '400',message:"Incumplimiento de precondiciones " +
                                    "(parámetros faltantes) o validación fallida", error})
                            });
                    })
                    .catch((error) => res.status(400).send({code: '400',message:"Incumplimiento de precondiciones " +
                        "(parámetros faltantes) o validación fallida", error}));
                }
            })
            .catch(error => res.status(500).send({code: '500', message:"Unexpected error", error}));
    },
};


//Funcion de hash simple para los tokens
function hash(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);		hash = ((hash<<5)-hash)+char;		hash = hash & hash; // Convert to 32bit integer
    }
    if (hash < 0) {
        hash = hash * -1;
    }
    return hash;
}


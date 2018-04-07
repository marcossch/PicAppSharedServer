const Server = require('../models').Server;
//const Post = require('../models').Post;

module.exports = {
    create: function (req, res) {
        return Server
            .create({
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
                res.status(400).send({message:"Incumplimiento de precondiciones " +
                    "(parámetros faltantes) o validación fallida", error})
            });
    },
    // list(req, res) { //devuelve todos los usuarios
    //     return User
    //         .findAll()
    //         .then(users => res.status(200).send(users))
    //         .catch(error => res.status(400).send(error));
    // },
    // retrieve(req, res) {
    //     return User
    //         .findByPrimary(req.params.username)
    //         .then(user => {
    //             if (!user) {
    //                 return res.status(404).send({
    //                     message: 'User Not Found',
    //                 });
    //             }
    //             return res.status(200).send(user);
    //         })
    //         .catch(error => res.status(400).send(error));
    // },
    // update(req, res) {
    //     return User
    //         .findByPrimary(req.params.username)
    //         .then(user => {
    //             if (!user) {
    //                 return res.status(404).send({
    //                     message: 'User Not Found',
    //                 });
    //             }
    //             return user
    //             //se puede actualizar cualquier cosa menos el nombre
    //             //se pasa con los nombres de los parametros por el body
    //                 .update(req.body, { fields: Object.keys(req.body) })
    //                 .then(() => res.status(200).send(user))  // Send back the updated user.
    //                 .catch((error) => res.status(400).send(error));
    //         })
    //         .catch((error) => res.status(400).send(error));
    // },
    // destroy(req, res) {
    //     return User
    //         .findByPrimary(req.params.username)
    //         .then(user => {
    //             if (!user) {
    //                 return res.status(400).send({
    //                     message: 'User Not Found',
    //                 });
    //             }
    //             return user
    //                 .destroy()
    //                 .then(() => res.status(200).send({ message: 'User deleted successfully.' }))
    //                 .catch(error => res.status(400).send(error));
    //         })
    //         .catch(error => res.status(400).send(error));
    // },
    // validate: function (req, res) {
    //     return User
    //         .findByPrimary(req.body.username)
    //         .then(user => {
    //             if (!user) {
    //                 return res.status(404).send({
    //                     message: 'User Not Found',
    //                 });
    //             }
    //             return user
    //                 .update({token: hash(user.name)})
    //                 .then(() => res.status(200).json({
    //                     metadata: {
    //                         version: "1.0"
    //                     },
    //                     token: {
    //                         expiresAt: 1000,
    //                         token: user.token
    //                     }
    //                 }))
    //                 .catch((error) => res.status(400).send(error));
    //         })
    //         .catch((error) => res.status(400).send(error));
    // },
};


//Funcion de hash simple para los tokens
function hash(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);		hash = ((hash<<5)-hash)+char;		hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


const File = require('../models').file;
const User = require('../models').User;
const Server = require('../models').Server;

module.exports = {

    /* CREATE FILE*/
    create: function (req, res) {

        return User.find({
            where: {token: req.query.BusinessToken}
        })
            .then(user => {

                if (!user) {
                    return res.status(401).send({
                        code:'401',
                        message: 'Unauthorized',
                    });
                }

                else {
                    File.create({
                        name: req.body.filename,
                        id: req.body.id,
                        rev: req.body._rev,

                        createdAt: req.body.createdTime,
                        updatedAt: req.body.updatedTime,
                        size: req.body.size,
                        resource: req.body.resource,

                    })
                        .then(file => res.status(201).json({
                            metadata: {
                                version: "1.0"
                            },
                            user: {
                                id: file.id,
                                _rev: file.rev,
                                createdTime: file.createdAt,
                                updatedTime: file.updatedAt,
                                size:file.size,
                                filename: file.name,
                                resource: file.resource
                            }
                        }))
                        .catch(error => {
                            res.status(400).send({
                                code:'400',
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
    /* GET ALL FILES */

    list(req, res) {

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
                File.findAll()
                    .then(file => res.status(200).send(file))
                    .catch(error => res.status(500).send({
                        code: '500',
                        message: "Unexpected error", error}));
                }
            }).catch(error => res.status(500).send({code: '500', message:"Unexpected error", error}));
    },

    /* Get File by ID */

    retrieve(req, res) {

        User.find({
            where: {token: req.query.BusinessToken}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        code: '401',
                        message: 'Unauthorized',
                    });
                }
                else {

                    File.findByPrimary(req.params.fileId)
                        .then(file => {
                            if (!file) {
                                return res.status(404).send({
                                    code: '404',
                                    message: 'File Not Found',
                                });
                            }
                            return res.status(200).json({
                                metadata: {
                                    version: "1.0"
                                },
                                user: {
                                    id: file.id,
                                    _rev: file.rev,
                                    createdTime: file.createdAt,
                                    updatedTime: file.updatedAt,
                                    size:file.size,
                                    filename: file.name,
                                    resource: file.resource
                                }
                            })
                        })
                        /*.catch(error => res.status(400).send({code: '400',message:"Incumplimiento de precondiciones " +
                            "(parámetros faltantes) o validación fallida", error}));
                            no lo pide pero podria ir */
                }
            })
            .catch(error => res.status(500).send({code: '500', message:"Unexpected error", error}));
    },

    /* Update de un atributo de un file */

    update(req, res) {

        //se valida la ApiKey
        User.find({
            where: {token: req.query.BusinessToken}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        code:'401',
                        message: 'Unauthorized',
                    });
                }
                else {


                    File.findByPrimary(req.params.fileId)
                        .then(file => {
                            if (!file) {
                                return res.status(404).send({
                                    code:'404',
                                    message: 'File Not Found',
                                });
                            }
                            return file
                                .update({
                                    name: req.body.filename || file.name,
                                    rev: req.body._rev || file.rev,
                                })
                                .then(() => res.status(200).json({
                                    metadata: {
                                        version: "1.0"
                                    },
                                    server: {
                                        server: {
                                            id: file.id,
                                            _rev: file.rev,
                                            createdTime: file.createdAt,
                                            updatedTime: file.updatedAt,
                                            size:file.size,
                                            filename: file.name,
                                            resource: file.resource
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

    /* Destroy File by ID */

    destroy(req, res) {

        //se valida la BusinessToken
        User.find({
            where: {token: req.query.BusinessToken}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
                        code: '401',
                        message: 'Unauthorized',
                    });
                }
                else {

                    File.findByPrimary(req.params.fileId)
                        .then(file => {
                            if (!file) {
                                return res.status(404).send({
                                    code: '404',
                                    message: 'File Not Found',
                                });
                            }
                            return file
                                .destroy()
                                .then(() => res.status(204).send({ code:'204', message: 'File deleted successfully.' }))
                                .catch(error => res.status(400).send({code:'400', message:"Incumplimiento de precondiciones " +
                                    "(parámetros faltantes) o validación fallida", error}));
                        })
                        .catch(error => res.status(400).send({code:'400', message:"Incumplimiento de precondiciones " +
                            "(parámetros faltantes) o validación fallida", error}));
                }
            })
            .catch(error => res.status(500).send({code: '500', message:"Unexpected error", error}));
    }
};

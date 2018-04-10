const File = require('../models').file;
const User = require('../models').User;

module.exports = {

    /* CREATE FILE*/
    create: function (req, res) {

        User.find({
            where: {token: req.params.apiKey}
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

        File.findAll()
            .then(file => res.status(200).send(file))
            .catch(error => res.status(400).send(error));
    },

    /* GET FILE ( ID ) */

    retrieve(req, res) {

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
            where: {token: req.params.apiKey}
        })
            .then(user => {
                if (!user) {
                    return res.status(401).send({
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
                                    name: req.body.name || file.name,
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

    /* */
};


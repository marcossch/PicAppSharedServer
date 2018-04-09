const File = require('../models').file;

module.exports = {

    /* CREATE FILE*/
    create: function (req, res) {
        return File
            .create({
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
                    createdTime: 0,
                    updatedTime: 0,
                    size: 0,
                    filename: file.name,
                    resource: file.resource
                }
            }))
            .catch(error => {
                res.status(400).send({
                    message: "Incumplimiento de precondiciones " +
                    "(parámetros faltantes) o validación fallida", error
                })
            });

        },
    /* GET ALL FILES */

    list(req, res) {

        File.findAll()
            .then(file => res.status(200).send(file))
            .catch(error => res.status(400).send(error));
    },
};


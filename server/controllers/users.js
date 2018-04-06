const User = require('../models').User;
const Post = require('../models').Post;

module.exports = {
    create: function (req, res) {
        return User
            .create({
                name: req.body.username,
                password: req.body.password,
                manualId: req.body.id,
                ref: req.body._rev,
                applicationOwner: req.body.applicationOwner,
            })
            .then(user => res.status(200).send(user))
            .catch(error => {
                res.status(400).send({message:"Incumplimiento de precondiciones " +
                    "(parámetros faltantes) o validación fallida", error})
            });
    },
    list(req, res) { //devuelve todos los usuarios
        return User
            .findAll({
                include: [{
                    model: Post,
                    as: 'posts',
                }],
            })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return User
            .findById(req.params.userId, {
                include: [{
                    model: Post,
                    as: 'posts',
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return User
            .findById(req.params.userId, {
                include: [{
                    model: Post,
                    as: 'posts',
                }],
            })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .update({
                        name: req.body.name || user.name,
                    })
                    .then(() => res.status(200).send(user))  // Send back the updated user.
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return User
            .findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(200).send({ message: 'User deleted successfully.' }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};

const User = require('../models').User;
const Post = require('../models').Post;

module.exports = {
  create(req, res) {
    return User
      .create({
        name: req.body.name,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
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
};

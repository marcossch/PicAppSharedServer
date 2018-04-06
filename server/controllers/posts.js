const Post = require('../models').Post;

module.exports = {
    create(req, res) {
        return Post
            .create({
                description: req.body.description,
                //falta validar userId
                userId: req.params.userId,
            })
            .then(post => res.status(201).send(post))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Post
            .find({
                where: {
                    id: req.params.postId,
                    userId: req.params.userId,
                },
            })
            .then(post => {
                if (!post) {
                    return res.status(404).send({
                        message: 'Post Not Found',
                    });
                }

                return post

                    //esto lo que hace es actualizar solo
                    //los parametros que le pasan, si no le pasan un parametro en particular entonces
                    //lo deja intacto
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(updatedPost => res.status(200).send(updatedPost))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Post
            .find({
                where: {
                    id: req.params.postId,
                    userId: req.params.userId,
                },
            })
            .then(post => {
                if (!post) {
                    return res.status(404).send({
                        message: 'Post Not Found',
                    });
                }

                return post
                    .destroy()
                    .then(() => res.status(200).send({ message: 'Post deleted successfully.' }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
};
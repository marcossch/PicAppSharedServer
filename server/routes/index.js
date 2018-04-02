const usersController = require('../controllers').users;
const postsController = require('../controllers').posts;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PicApp API!',
  }));

  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  app.post('/api/users/:userId/post', postsController.create);
};

const usersController = require('../controllers').users;
const postsController = require('../controllers').posts;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PicApp API!',
  }));

  //requests de usuarios
  app.post('/api/user', usersController.create);
  app.get('/api/users', usersController.list);
  app.get('/api/users/:userId', usersController.retrieve);
  app.put('/api/users/:userId', usersController.update);
  app.delete('/api/users/:userId', usersController.destroy);


  //requests de posts
  app.post('/api/users/:userId/posts', postsController.create);
  app.put('/api/users/:userId/posts/:postId', postsController.update);
  app.delete('/api/users/:userId/posts/:postId', postsController.destroy);


  //For any other request method on posts, we're going to return "Method Not Allowed"
  app.all('/api/users/:userId/post', (req, res) =>
      res.status(405).send({
          message: 'Method Not Allowed',
      }));


};

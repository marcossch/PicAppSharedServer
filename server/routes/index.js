const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PicApp API!',
  }));

  //api pedida
  app.post('/api/user', usersController.create);
  app.post('/api/token', usersController.validate);

  //requests de usuarios
  app.get('/api/users', usersController.list);
  app.get('/api/users/:username', usersController.retrieve);
  app.put('/api/users/:username', usersController.update);
  app.delete('/api/users/:username', usersController.destroy);



  //For any other request method on posts, we're going to return "Method Not Allowed"
  // app.all('/api/users/:userId/post', (req, res) =>
  //     res.status(405).send({
  //         message: 'Method Not Allowed',
  //     }));


};

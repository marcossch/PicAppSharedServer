const usersController = require('../controllers').users;
const serversController = require('../controllers').servers;
const filesController = require('../controllers').files;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PicApp API!',
  }));

  //api pedida
    //users
    app.post('/api/user/:apiKey', usersController.create);
    app.post('/api/token', usersController.validate);

    //servers
    app.post('/api/servers/:apiKey', serversController.create);
    app.get('/api/servers/:serverId/:apiKey', serversController.retrieve);
    app.put('/api/servers/:serverId/:apiKey', serversController.update);
    app.delete('/api/servers/:serverId/:apiKey', serversController.destroy);
    app.post('/api/servers/:serverId/:apiKey', serversController.tokenReset);

  //requests de servers
  app.get('/api/servers', serversController.list);

  //requests de usuarios
  app.get('/api/users', usersController.list);
  app.get('/api/users/:username', usersController.retrieve);
  app.put('/api/users/:username', usersController.update);
  app.delete('/api/users/:username', usersController.destroy);

  //requests de files
  app.post('/api/files', filesController.create);
  app.get('/api/files', filesController.list);


  //For any other request method on posts, we're going to return "Method Not Allowed"
  // app.all('/api/users/:userId/post', (req, res) =>
  //     res.status(405).send({
  //         message: 'Method Not Allowed',
  //     }));

};

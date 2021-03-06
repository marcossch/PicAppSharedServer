const usersController = require('../controllers').users;
const serversController = require('../controllers').servers;
const filesController = require('../controllers').files;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the PicApp API!',
  }));

  //api pedida
    //users
    app.post('/api/user', usersController.create); /**/
    app.post('/api/user/super', usersController.supercreate);/*metodo solo para pruebas*/
    app.post('/api/supertoken', usersController.supervalidate);/*metodo solo para pruebas*/
    app.post('/api/token', usersController.validate);

    //servers
    app.post('/api/servers', serversController.create);
    app.get('/api/servers/:serverId', serversController.retrieve);
    app.put('/api/servers/:serverId', serversController.update);
    app.delete('/api/servers/:serverId', serversController.destroy);
    app.post('/api/servers/:serverId', serversController.tokenReset);
    app.get('/api/servers', serversController.list);


  //requests de usuarios
  app.get('/api/users/', usersController.list); /**/
  app.get('/api/users/:username', usersController.retrieve); /**/
  app.put('/api/users/:username', usersController.update); /**/
  app.delete('/api/users/:username', usersController.destroy);/**/

  //requests de files
  app.post('/api/files', filesController.create);
  app.get('/api/files', filesController.list);
  app.get('/api/files/:fileId', filesController.retrieve);
  app.put('/api/files/:fileId', filesController.update);
  app.delete('/api/files/:fileId', filesController.destroy);
  //app.post('/api/files/upload', filesController.upload);


  //For any other request method on posts, we're going to return "Method Not Allowed"
  // app.all('/api/users/:userId/post', (req, res) =>
  //     res.status(405).send({
  //         message: 'Method Not Allowed',
  //     }));

};

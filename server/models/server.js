'use strict';
module.exports = (sequelize, DataTypes) => {
  var Server = sequelize.define('Server', {
    name: DataTypes.STRING
  }, {});
  Server.associate = function(models) {
    // associations can be defined here
  };
  return Server;
};
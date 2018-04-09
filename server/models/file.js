'use strict';
module.exports = (sequelize, DataTypes) => {
  var file = sequelize.define('file', {
      id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING,
          unique: true
      },
      rev: {
          allowNull: false,
          type: DataTypes.STRING
      },
      size: {
          allowNull: false,
          type: DataTypes.INTEGER
      },
      name: {
          allowNull: false,
          type: DataTypes.STRING
      },
      resource: {
          allowNull: false,
          type: DataTypes.STRING
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE
      },
      updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
      }
  }, {});
  file.associate = function(models) {
    // associations can be defined here
  };
  return file;
};
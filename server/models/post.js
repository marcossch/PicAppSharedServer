
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('{Post}', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE', //si se elimina un usuario entonces se eliminan todas sus fotos
    });
  };

  return Post;
};

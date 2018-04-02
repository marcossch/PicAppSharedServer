// module.exports = (sequelize, DataTypes) => {
//     const Post = sequelize.define('Post', {
//         description: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         complete: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false,
//         },
//         // userId: {
//         //     type: DataTypes.INTEGER,
//         //     defaultValue: false,
//         //     allowNull: false,
//         // },
//     }, {
//         classMethods: {
//             associate: (models) => {
//                 Post.belongsTo(models.User, {
//                     foreignKey: 'userId',
//                     onDelete: 'CASCADE', //si se elimina un usuario entonces se eliminan todas sus fotos
//                     as: 'user',
//                 });
//             },
//         },
//     });
//     return Post;
// };


module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
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
            onDelete: 'CASCADE',
        });
    };

    return Post;
};
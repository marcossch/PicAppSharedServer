module.exports = (sequelize, DataTypes) => {
    const Server = sequelize.define('Server', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
            unique:true,
        },
    });

    Server.associate = function(models) {
        // associations can be defined here
    };
    return Server;
};
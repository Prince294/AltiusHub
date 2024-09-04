module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            unique: true,
        },

    });

    return User;
};
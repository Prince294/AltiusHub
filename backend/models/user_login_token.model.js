// app/models/user_login_token.model.js

module.exports = (sequelize, Sequelize) => {
  const UserLoginToken = sequelize.define("user_login_token", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    expiry_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });

  return UserLoginToken;
};
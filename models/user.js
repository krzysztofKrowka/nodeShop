const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  currentUser: Sequelize.BOOLEAN,
  isAdmin: Sequelize.BOOLEAN,
  password: Sequelize.STRING,
});

module.exports = User;

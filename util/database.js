const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.db,
  process.env.user,
  process.env.passworddb,
  {
    dialect: process.env.dialect,
    host: process.env.host,
  }
);

module.exports = sequelize;

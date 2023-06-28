const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "ZAQ12wsx", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

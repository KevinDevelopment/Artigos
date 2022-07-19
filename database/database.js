const Sequelize = require("sequelize");
const connection = new Sequelize('perguntas', 'kevin', '12345', {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

module.exports = connection;
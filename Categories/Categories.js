const Sequelize = require("sequelize");
const connection = require("../database/database");

const Categories = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Categories.sync({force: false}).then(() => {
    console.log("Tabela criada")
}).catch((erro) => {
    console.log(`${erro}`)
});


module.exports = Categories;
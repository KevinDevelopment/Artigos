const Sequelize = require("sequelize");
const connection = require("../database/database");
const Categories = require("../Categories/Categories");

const Articles = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});


// Categories.hasMany(Articles);
// Articles.belongsTo(Categories);

Articles.sync({force: false}).then(() => {
    console.log("Tabela criada")
}).catch((erro) => {
    console.log(`${erro}`)
});
module.exports = Articles;
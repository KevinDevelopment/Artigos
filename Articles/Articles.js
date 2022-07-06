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


Categories.hasMany(Articles);
Articles.belongsTo(Categories);


module.exports = Articles;
const express = require("express");
const app = express();
const categoriescontroller = require("./Categories/CategoriesController"); 
const articlecontroller = require("./Articles/ArticlesController");
const connection = require("./database/database");
const Categories = require("./Categories/Categories");
const Articles = require("./Articles/Articles");
const userscontroller = require("./User/UserController");
const Users = require("./User/User");


connection.authenticate().then(() => {
    console.log("Conexão estabelecida com sucesso.")
}).catch((erro) => {
    console.log(`Ops!, houve um erro ${erro}`)
});

//configurações express
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/", (request, response) => {

    Articles.findAll({raw:true, order: [
        ['id','DESC']
    ]}).then((articles) => {

        Categories.findAll().then((categories) => {
            response.render("index", {
                articles: articles,
                categories: categories
            })
        })

        
    });

   
});

app.get("/:slug", (request, response) => {
    const { slug } = request.params;
    Articles.findOne({
        where: {
            slug: slug
        }
    }).then((article) => {
        if (article != undefined) {
            Categories.findAll().then((categories) => {
                response.render("article", {
                    article: article,
                    categories: categories
                })
            })
        }
        else {
            response.redirect("/")
        }
    }).catch((erro) => {
        response.redirect("/")
    })
});

app.get("/categori/:slug", (request, response) => {
    const { slug } = request.params;
    Categories.findOne({
        where: {
            slug: slug
        },
        include: [{model: Articles}]
    }).then((categori) => {
        if (categori != undefined) {
            Categories.findAll({raw:true}).then((categories) => {
                response.render("index", {articles: categori.articles, categories: categories})
            })
        }
        else {
            response.redirect("/")
        }
    }).catch((erro) => {
        response.redirect("/")
    })
});

app.use("/", categoriescontroller);
app.use("/", articlecontroller);
app.use("/", userscontroller);

const PORT = 8080;
app.listen(PORT, (request, response) => {
    console.log(`Servidor rodando na porta ${PORT}`)
});
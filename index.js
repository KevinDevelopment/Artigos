const express = require("express");
const app = express();
const categoriescontroller = require("./Categories/CategoriesController"); 
const articlecontroller = require("./Articles/ArticlesController");
const connection = require("./database/database");
const Categories = require("./Categories/Categories");
const Articles = require("./Articles/Articles");


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
    response.render("index")
});

app.use("/", categoriescontroller);
app.use("/", articlecontroller);

const PORT = 8080;
app.listen(PORT, (request, response) => {
    console.log(`Servidor rodando na porta ${PORT}`)
});
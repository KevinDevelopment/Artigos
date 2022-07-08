const express = require("express");
const router = express.Router();
const Categories = require("../Categories/Categories");
const Articles = require("./Articles");
const slugify = require("slugify");

router.get("/admin/articles", (request, response) => {
    response.send("minha rota de articles")
});

router.get("/admin/articles/new", (request, response) => {

    Categories.findAll({raw: true}).then((Categories) => {

        response.render("admin/articles/new", {
            Categories: Categories
        })
    })

    
});

router.post("/articles/save", (request, response) => {
    const { title, body, categoria } = request.body;

    Articles.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoria
    }).then(() => {
        response.redirect("/admin/articles")
    });

})

module.exports = router;
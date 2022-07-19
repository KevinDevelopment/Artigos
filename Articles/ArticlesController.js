const express = require("express");
const router = express.Router();
const Categories = require("../Categories/Categories");
const Articles = require("./Articles");
const slugify = require("slugify");

router.get("/admin/articles", (request, response) => {

        Articles.findAll({
            include: [{model: Categories}]
        }).then((articles) => {
        response.render("admin/articles/index", {
            articles: articles
        })
    }).catch((erro) => {

    })

    
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

});

router.post("/articles/delete", (request, response) => {
    const { id } = request.body;

    if(id != undefined) {
        
        if(!isNaN(id)) {

            Articles.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                response.redirect("/admin/articles");
            })

        }
        else {
            response.redirect("/admin/articles");
        }
    }
    else {
        response.redirect("/admin/articles");
    }

});

router.get("/admin/articles/edit/:id", (request, response) => {
    const { id } = request.params;
    Articles.findByPk(id).then((article) => {
        if (article != null) {

            Categories.findAll({raw:true}).then((Categories) => {
                response.render("admin/articles/edit", {Categories: Categories})
            })

           
        }
        else {
            response.redirect("/")
        }
    }).catch((erro) => {
        response.redirect("/");
    })
})

router.get("/articles/page/:num", (request, response) => {
    const { page } = request.params;
})

module.exports = router;
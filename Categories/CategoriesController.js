const express = require("express");
const router = express.Router();
const Categories = require("./Categories");
const slugify = require("slugify");


router.get("/admin/categories/new", (request, response) => {
    response.render("admin/categories/new")
});

router.post("/categories/save", (request, response) => {

    const { title } = request.body;

    if(title != undefined && title !== null) {//sempre verificar se o valor é um valor valido

        Categories.create({

            title: title,
            slug: slugify(title)

        }).then(() => {
            console.log("Dados salvos com sucesso!")
            response.redirect("/admin/categories")
        })

    }
    else {
        response.redirect("/admin/categories/new")
    }
    

});

router.get("/admin/categories", (request, response) => {

    Categories.findAll({raw:true}).then((Categories) => {

        response.render("admin/categories/index", {
            Categories: Categories
        })

    }).catch((erro) => {
        console.log(`Ops!, houve um erro!`)
    })

   
});

router.post("/categories/delete", (request, response) => {
    const { id } = request.body;

    if(id != undefined) {
        
        if(!isNaN(id)) {

            Categories.destroy({
                where: {
                    id:id
                }
            }).then(()=>{
                response.redirect("/admin/categories");
            })

        }
        else {
            response.redirect("/admin/categories");
        }
    }
    else {
        response.redirect("/admin/categories");
    }

});

router.get("/admin/categories/edit/:id", (request, response) => {
    
    const { id }  = request.params;

    if (isNaN(id)) {
        response.redirect("/admin/categories");
    }

    Categories.findByPk(id).then( Categories => {
        if (Categories != undefined) {
            response.render("admin/categories/edit", {Categories: Categories})
        }
        else {
            response.redirect("/admin/categories");
        }
    }).catch((erro) => {
        response.redirect("/admin/categories");
    })

});

router.post("/categories/update", (request, response) => {
    const { id, title } = request.body;

    Categories.update({
        title: title,
        slug: slugify(title)
    }, {
        where: {
            id:id
        }
    }).then(() => {
        response.redirect("/admin/categories");
    })

});

module.exports = router;
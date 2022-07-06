const express = require("express");
const router = express.Router();

router.get("/articles", (request, response) => {
    response.send("minha rota de articles")
});

router.get("/admin/articles/new", (request, response) => {
    response.send("minha nova rota de articles")
});

module.exports = router;
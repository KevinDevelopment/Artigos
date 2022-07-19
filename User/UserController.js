const express = require("express");
const router = express.Router();
const Users = require("./User");
const bcrypt = require("bcrypt");

router.get("/admin/users", (request, response) => {
   Users.findAll({raw: true}).then((usuarios) => {
      response.render("admin/Users/index", {
          usuarios: usuarios
      });
   });
});

router.get("/admin/users/create", (request, response) => {
  response.render("admin/Users/create");
});

router.post("/users/create", async (request, response) => {
  const { email, password } = request.body;

  const hashed = await bcrypt.hash(password, 10);

  const find = await Users.findOne({
    attributes: ['id', 'email', 'password'],
    where: {
      email: email
    }
  });

  if (!find) {
    await Users.create({
      email: email,
      password: hashed
    }).then(() => {
      return response.status(200).json({
        email: email,
        password: hashed,
        teste: find
      })
    }).catch((erro) => {
      console.log(`Ops!, houve um erro ${erro}`)
    })
  }
  else {
    response.status(400).json({
      erro: true,
      mensagem: "ja existe um usuário cadastrado com este email",
      teste: find
    })
  }


});

module.exports = router;
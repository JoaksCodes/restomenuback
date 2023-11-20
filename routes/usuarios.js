const { Router } = require("express");
const router = Router();
const usersController = require('../controllers/usersController');
const { validarCampos } = require('../middlewares/validate');
const { usuarioExiste,esAdmin } = require('../helpers/db-validator');
const { check } = require('express-validator');

router.get("/getUsers", usersController.index);

router.get("/getOneUser/:id", [
    check("id", "No es un id válido!").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos
], usersController.getOne);

router.put("/updateUser/:id", [
    check("id", "No es un id válido!").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos
], usersController.update);

router.post("/createUser", [
    check("nombre","El nombre es obligatorio"),
    check("apellido","El nombre es obligatorio"),
    check("correo","No es un correo válido").isEmail(),
    check("password","La contraseña es obligatoria"),
    validarCampos
], usersController.create);

module.exports = router;
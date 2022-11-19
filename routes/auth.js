/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validarJWT, validarJWt } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validador-campos");
const {
  crearUsuario,
  loginUsuario,
  revalidarRegistro,
} = require("../controllers/auth");

router.post(
  "/new",
  [
    //middleswares
    check("name", "El Nombre es Obligatorio").not().isEmpty(),
    check("email", "El Email es Obligatorio").isEmail(),
    check(
      "password",
      "El password debe de tener al menos 6 Caracteres"
    ).isLength({
      min: 6,
    }),
    validarCampos,
  ],
);

router.post(
  "/",
  [
    check("email", "El Email es Obligatorio").isEmail(),
    check("password", "El password debe de tener al menos 6 Caracteres"),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWt  , revalidarRegistro);

module.exports = router;

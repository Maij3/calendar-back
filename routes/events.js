//Obtener Eventos
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validador-campos");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  borrarEvento,
} = require("../controllers/events");
const { validarJWt } = require("../middlewares/validar-jwt");
const { isDate } = require("../helpers/isDate");
const router = Router();

//Todas tienen que pasar por la validacion del jwt
router.use(validarJWt);

//Obtener Eventos
router.get("/", getEventos);

//Crear Evento
router.post(
  "/",
  [
    check("title", "El Titulo es Obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es Obligatoria").custom(isDate),
    check("end", "Fecha de Finalizacion es Obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

//Actualizar Evento
router.put(
  "/:id",
  [
    check("title", "El Titulo es Obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es Obligatoria").custom(isDate),
    check("end", "Fecha de Finalizacion es Obligatoria").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

//Borrar Evento
router.delete("/:id", [], borrarEvento);

//Module Exports
module.exports = router;

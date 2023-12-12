const {Router} = require('express');
const router = Router();

const { renderRegistrar, renderListar,renderEliminar,renderModificar,renderLogin } = require('../controllers/index.controllers')
const {ModificarUsuarios, iniciosesion} = require('../controllers/usuarios.controllers')
router.get("/", renderRegistrar);
router.get("/Modificar", renderModificar);
router.put('/ModificarUsuario/:id', ModificarUsuarios);
router.get("/Eliminar", renderEliminar);
router.get("/Listar", renderListar);
router.get('/Login', renderLogin);
router.put('/Inicio', iniciosesion);
module.exports = router;
// RUTAS DE USUARIO
const { Router } = require('express');
const router = Router();
const authMiddleware = require('../servidor');

const {
  renderModificar,
  renderListar,
  renderUsuarios,
  RegistrarUsuarios,
  ModificarUsuarios,
  EliminarUsuarios,
  renderlogin,
  iniciosesion
} = require('../controllers/usuarios.controllers');

const{

ModificarUser

}= require('../controllers/index.controllers')

// Agregar usuario  
router.get('/', renderUsuarios);

router.post('/Usuario/Registro', RegistrarUsuarios);

// Obtener todos los usuarios
router.get('/Usuario', authMiddleware.isAuthenticated, renderListar);

// Modificar los usuarios
router.get('/Modificar/:id', renderModificar);
router.put('/ModificarUsuario/:id', ModificarUser);

router.delete('/Eliminar/:id', EliminarUsuarios);



/// RUTAS PARA EL LOGIN

router.get('/Login', renderlogin);
router.post('/Inicio', iniciosesion);



module.exports = router;

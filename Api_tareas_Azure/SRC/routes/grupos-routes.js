const { Router } = require('express');
const router = Router();

const {listar_grupos_usuario,crear_grupos_usuario } = require('../controllers/Grupos/grupos_controller');

//Obtener recursos
router.get('/GruposUsuario/:id',listar_grupos_usuario);
//Crear recursos
router.post('/CrearGrupo',crear_grupos_usuario);
//Editar recursos
//router.put('/ModificarGrupo',modificar_grupos_usuario);
//Eliminar recursos
//router.delete('/EliminarGrupo',eliminar_grupos_usuario);

module.exports = router;
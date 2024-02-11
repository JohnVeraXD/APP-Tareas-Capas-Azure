const { Router } = require('express');
const router = Router();

const {listar_tareas_usuario,crear_tareas_usuario , modificar_tareas_usuario,eliminar_tareas_usuario} = require('../controllers/Tareas/tareas_controller');

//Obtener recursos
router.get('/ListaTareas/:id/:id_grupo', listar_tareas_usuario);
//Crear recursos
router.post('/CrearTarea', crear_tareas_usuario);
//Editar recursos
router.put('/ModificarTarea',modificar_tareas_usuario);
//Eliminar recursos
router.delete('/EliminarTarea/:id',eliminar_tareas_usuario);


module.exports = router;
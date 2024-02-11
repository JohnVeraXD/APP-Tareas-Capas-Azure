const pool = require('../../database/db');
const jwt = require('jsonwebtoken');


//funcion para listar las tareas que tiene un usuario dentro de x grupo

const listar_tareas_usuario = async (req, res, next) => {
    try {

        const { id , id_grupo} = req.params;

        const result = await pool.query('select * from fu_tareas_usuario($1,$2)', [id,id_grupo]);

        //console.log(id);
        //console.log(result.rows);

        return res.status(200).json(result.rows);

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

//funcion para crear una tarea de un usuario x en x grupo

const crear_tareas_usuario = async (req, res, next) => {
    try {
        const { p_titulo, p_descripcion,p_importante, p_id_user,p_id_grupos } = req.body;

        const result = await pool.query('call sp_crear_tareas($1,$2,$3,$4,$5)', [p_titulo, p_descripcion,p_importante, p_id_user,p_id_grupos]);

        return res.status(200).json({ message: "Se creó la tarea" });
        //return res.status(200).json(result.rows);

    } catch (error) {
        //console.log(error);
        return res.status(404).json({ error: error.message });
    }
}

//funcion para modificar una tarea de un usuario x de un x grupo

const modificar_tareas_usuario = async (req, res, next) => {
    try {
        const { p_titulo, p_descripcion,p_importante, p_id_tareas } = req.body;

        //console.log(req.body);

        const result = await pool.query('call sp_modificar_tarea($1,$2,$3,$4)', [p_titulo, p_descripcion,p_importante, p_id_tareas]);

        return res.status(200).json({ message: "Se modifico la tarea" });
        //return res.status(200).json(result.rows);

    } catch (error) {
        //console.log(error);
        return res.status(404).json({ error: error.message });
    }
}

//funcion para Eliminar una tarea de un usuario x de un x grupo

const eliminar_tareas_usuario = async (req, res, next) => {
    try {
        const { id } = req.params;

        //console.log(id);

        const result = await pool.query('call sp_eliminar_tarea($1)', [id]);

        return res.status(200).json({ message: "Se Elimino la tarea" });
        //return res.status(200).json(result.rows);

    } catch (error) {
        //console.log(error);
        return res.status(404).json({ error: error.message });
    }
}

module.exports = {
    listar_tareas_usuario,
    crear_tareas_usuario,
    modificar_tareas_usuario,
    eliminar_tareas_usuario
};
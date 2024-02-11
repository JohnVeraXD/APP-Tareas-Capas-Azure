const pool = require('../../database/db');
const jwt = require('jsonwebtoken');


//funcion para listar los grupos de tareas que tiene un usuario

const listar_grupos_usuario = async (req, res, next) => {
    try {

        const { id } = req.params;

        const result = await pool.query('select * from fu_grupos_usuario($1)', [id]);

        //console.log(id);
        //console.log(result.rows);

        return res.status(200).json(result.rows);

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

//funcion para crear un grupo de tareas de un usuario x

const crear_grupos_usuario = async (req, res, next) => {
    try {
        const { p_titulo, p_descripcion, p_id_user } = req.body;
        const result = await pool.query('call sp_crear_grupos($1,$2,$3)', [p_titulo, p_descripcion, p_id_user]);
        return res.status(200).json({ message: "Se creó el grupo" });
        //return res.status(200).json(result.rows);

    } catch (error) {
        //console.log(error);
        return res.status(404).json({ error: error.message });
    }
}



module.exports = {
    listar_grupos_usuario,
    crear_grupos_usuario
};
const db = require('../config/db.config.js');
const Empleado = db.Empleado;

// Crear un nuevo empleado
exports.create = (req, res) => {
    let empleado = {};

    try {
        // Construir el objeto Empleado a partir de la solicitud HTTP
        empleado.nombre = req.body.nombre;
        empleado.apellido = req.body.apellido;
        empleado.correo = req.body.correo;
        empleado.sueldo = req.body.sueldo;
        empleado.estado = req.body.estado;

        // Guardar en la base de datos
        Empleado.create(empleado).then(result => {
            res.status(200).json({
                message: "Empleado creado exitosamente con id = " + result.id_emp,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error!",
            error: error.message
        });
    }
};

// Recuperar todos los empleados
exports.retrieveAllEmpleados = (req, res) => {
    Empleado.findAll()
        .then(empleados => {
            res.status(200).json({
                message: "Empleados recuperados exitosamente.",
                empleados: empleados
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error.message
            });
        });
};

// Recuperar un empleado por ID
exports.getEmpleadoById = (req, res) => {
    let empleadoId = req.params.id;
    Empleado.findByPk(empleadoId)
        .then(empleado => {
            if (empleado) {
                res.status(200).json({
                    message: "Empleado recuperado exitosamente con id = " + empleadoId,
                    empleado: empleado
                });
            } else {
                res.status(404).json({
                    message: "Empleado no encontrado con id = " + empleadoId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error!",
                error: error.message
            });
        });
};

// Actualizar un empleado por ID
exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "Empleado no encontrado para actualizar con id = " + empleadoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                correo: req.body.correo,
                sueldo: req.body.sueldo,
                estado: req.body.estado
            };

            let result = await Empleado.update(updatedObject, { returning: true, where: { id_emp: empleadoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el empleado con id = " + empleadoId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Empleado actualizado exitosamente con id = " + empleadoId,
                empleado: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
};

// Desactivar un empleado por ID
exports.deactivateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No existe un empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            // Actualizar el estado del empleado a 'Inactivo'
            empleado.estado = 'Inactivo';
            await empleado.save();

            res.status(200).json({
                message: "Empleado desactivado exitosamente con id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo desactivar el empleado con id = " + req.params.id,
            error: error.message,
        });
    }
};

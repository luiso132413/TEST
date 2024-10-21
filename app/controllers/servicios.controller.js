const db = require('../config/db.config.js');
const Servicio = db.Servicio;

// Crear un nuevo servicio
exports.create = (req, res) => {
    const servicio = {
        fechaingreso: req.body.fechaingreso,
        fechasalida: req.body.fechasalida,
        cuarto: req.body.cuarto,
        tipodeservicio: req.body.tipodeservicio,
        tipodepago: req.body.tipodepago,
        pagototal: req.body.pagototal,
    };

    // Guardar en la base de datos
    Servicio.create(servicio)
        .then(result => {
            res.status(201).json({
                message: "Servicio creado exitosamente con id = " + result.id_ser,
                servicio: result,
            });
        })
        .catch(error => {
            console.error(error); // Para más información sobre el error
            res.status(500).json({
                message: "¡Error al crear el servicio!",
                error: error.message
            });
        });
};


// Recuperar todos los servicios
exports.retrieveAllServicios = (req, res) => {
    Servicio.findAll()
        .then(servicios => {
            res.status(200).json({
                message: "Servicios recuperados exitosamente.",
                servicios: servicios
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al recuperar servicios!",
                error: error.message
            });
        });
};

// Recuperar un servicio por ID
exports.getServicioById = (req, res) => {
    let servicioId = req.params.id;
    Servicio.findByPk(servicioId)
        .then(servicio => {
            if (servicio) {
                res.status(200).json({
                    message: "Servicio recuperado exitosamente con id = " + servicioId,
                    servicio: servicio
                });
            } else {
                res.status(404).json({
                    message: "Servicio no encontrado con id = " + servicioId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al recuperar el servicio!",
                error: error.message
            });
        });
};

// Actualizar un servicio por ID
exports.updateById = async (req, res) => {
    try {
        let servicioId = req.params.id;
        let servicio = await Servicio.findByPk(servicioId);

        if (!servicio) {
            res.status(404).json({
                message: "Servicio no encontrado para actualizar con id = " + servicioId,
                error: "404"
            });
        } else {
            let updatedObject = {
                fechaingreso: req.body.fechaingreso,
                fechasalida: req.body.fechasalida,
                cuarto: req.body.cuarto,
                tipodeservicio: req.body.tipodeservicio,
                tipodepago: req.body.tipodepago,
                pagototal: req.body.pagototal
            };

            let result = await Servicio.update(updatedObject, { returning: true, where: { id_ser: servicioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se pudo actualizar el servicio con id = " + servicioId,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Servicio actualizado exitosamente con id = " + servicioId,
                servicio: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se pudo actualizar el servicio con id = " + req.params.id,
            error: error.message
        });
    }
};

let express = require('express');
let router = express.Router();

const empleado = require('../controllers/empleados.controller.js');
const servicio = require('../controllers/servicios.controller.js');

// Crear un nuevo empleado
router.post('/api/empleado/create', empleado.create);

// Recuperar todos los empleados
router.get('/api/empleado/all', empleado.retrieveAllEmpleados);

// Recuperar un empleado por ID
router.get('/api/empleado/onebyid/:id', empleado.getEmpleadoById);

// Actualizar un empleado por ID
router.put('/api/empleado/update/:id', empleado.updateById);

// Desactivar un empleado por ID (en lugar de eliminarlo)
router.put('/api/empleado/deactivate/:id', empleado.deactivateById);


// Crear un nuevo servicio
router.post('/api/servicio/create', servicio.create);

// Recuperar todos los servicios
router.get('/api/servicio/all', servicio.retrieveAllServicios);

// Recuperar un servicio por ID
router.get('/api/servicio/onebyid/:id', servicio.getServicioById);

// Actualizar un servicio por ID
router.put('/api/servicio/update/:id', servicio.updateById);


module.exports = router;

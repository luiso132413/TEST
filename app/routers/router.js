let express = require('express');
let router = express.Router();

const empleado = require('../controllers/empleados.controller.js');

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

module.exports = router;

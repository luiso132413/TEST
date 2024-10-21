
module.exports = (sequelize, Sequelize) => {
	const Empleados = sequelize.define('empleado', {	
	  id_emp: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	nombre: {
		    type: Sequelize.STRING
	},
	apellido: {
		    type: Sequelize.STRING
	},
	correo: {
		    type: Sequelize.STRING
	},
	sueldo: {
		    type: Sequelize.DOUBLE
	},
	estado: {
		type: Sequelize.STRING
	}
	});
	
	return Empleados;
}
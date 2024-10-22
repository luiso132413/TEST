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
	  rol: {
		    type: Sequelize.INTEGER,
		    set(value) {
			    if (value.toLowerCase() === 'admin') {
				    this.setDataValue('rol', 1);
			    } else if (value.toLowerCase() === 'empleado') {
				    this.setDataValue('rol', 0);
			    } else {
				    throw new Error('Rol inválido, debe ser "admin" o "empleado"');
			    }
		    }
	  },
	  estado: {
		    type: Sequelize.STRING,
		    defaultValue: 'Activo' // Por si quieres que el estado sea 'Activo' por defecto
	  }
	});
	
	return Empleados;
}

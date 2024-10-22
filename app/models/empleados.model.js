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
				if (typeof value === 'string') {
				    const lowerValue = value.toLowerCase();
				    if (lowerValue === 'admin') {
					    this.setDataValue('rol', 1);
				    } else if (lowerValue === 'empleado') {
					    this.setDataValue('rol', 0);
				    } else {
					    throw new Error('Rol inválido, debe ser "admin" o "empleado"');
				    }
				} else {
					throw new Error('El rol debe ser una cadena de texto');
				}
		    }
	  },
	  estado: {
		    type: Sequelize.STRING,
		    defaultValue: 'Activo'
	  }
	});
	
	return Empleados;
}

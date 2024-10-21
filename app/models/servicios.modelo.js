
module.exports = (sequelize, Sequelize) => {
	const Servicio = sequelize.define('servicio', {	
	  id_ser: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	fechaingreso: {
		    type: Sequelize.STRING
	},
	fechasalida: {
		    type: Sequelize.STRING
	},
	cuarto: {
		    type: Sequelize.STRING
	},
	tipodeservicio: {
		    type: Sequelize.DOUBLE
	},
	tipodepago: {
		type: Sequelize.STRING
	},
	pagototal: {
		type: Sequelize.STRING
	}
	});
	
	return Servicio;
}
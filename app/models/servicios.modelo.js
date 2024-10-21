
module.exports = (sequelize, Sequelize) => {
	const Servicio = sequelize.define('servicio', {	
	  id_ser: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	fechaingreso: {
		    type: Sequelize.DATE
	},
	fechasalida: {
		    type: Sequelize.DATE
	},
	cuarto: {
		    type: Sequelize.STRING
	},
	tipodeservicio: {
		    type: Sequelize.STRING
	},
	tipodepago: {
		type: Sequelize.STRING
	},
	pagototal: {
		type: Sequelize.DOUBLE
	}
	});
	
	return Servicio;
}
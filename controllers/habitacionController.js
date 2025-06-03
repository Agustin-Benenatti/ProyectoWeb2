const Habitacion = require('../models/HabitacionModels');
const Ala = require('../models/AlaModels');
const Cama = require('../models/CamaModels');

const obtenerHabitaciones = async (req, res) => {
    try {
        const habitaciones = await Habitacion.findAll({
            include: [
                {
                    model: Ala,
                    as: 'Ala',
                    attributes: ['nombre_ala'] 
                },
                {
                    model: Cama,
                    as: 'Camas',
                    attributes: ['id_cama', 'estado']
                }
            ],
            order: [['id_habitacion', 'ASC']]
        });

        res.render('habitacion', {Mainclass: '' ,habitaciones });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las habitaciones');
    }
};

module.exports = { 
    obtenerHabitaciones
 };
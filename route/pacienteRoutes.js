const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');


router.get('/', async (req, res) => {
  try {
    const pacientes = await pacienteController.obtenerPacientes();
    res.render('Paciente', { mainClass: '', pacientes });
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).send('Error al obtener los pacientes');
  }
});

module.exports = router;
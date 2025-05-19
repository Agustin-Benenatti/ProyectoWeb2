const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

const ObraSocial = require('../models/ObraSocialModels');

// RUTA PARA MOSTRAR TODOS LOS PACIENTES
router.get('/', async (req, res) => {
  try {
    const pacientes = await pacienteController.obtenerPacientes();
    res.render('Paciente', { mainClass: '', pacientes });
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).send('Error al obtener los pacientes');
  }
});

// RUTA PARA MOSTRAR EL FORMULARIO PARA CARGAR UN PACIENTE
router.get('/crearPaciente', async (req, res) => {
  try {
    const obrasSociales = await ObraSocial.findAll();
    res.render('crearPaciente', { mainClass: '', obrasSociales });
  } catch (error) {
    console.error('Error al cargar obras sociales:', error);
    res.status(500).send('Error al cargar formulario');
  }
});

// RUTA PARA PROCESAR EL FORMULARIO Y CARGAR EL PACIENTE
router.post('/cargar', async (req, res) => {
  try {
    await pacienteController.crearPaciente(req.body);
    console.log(req.body);
    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al guardar paciente:', error);
    res.status(400).send(error.message || 'Error al guardar el paciente');
  }
});

module.exports = router;
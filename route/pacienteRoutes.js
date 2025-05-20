const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

const ObraSocial = require('../models/ObraSocialModels');
const Paciente = require('../models/PacienteModels');

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

// RUTA PARA PROCESAR EL FORMULARIO DE CREAR Y CARGAR EL PACIENTE
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

// RUTA PARA EL FORM DE ACTUALIZAR PACIENTE 
router.get('/editar/:id', async (req, res) => {
  try {
    const paciente = await pacienteController.obtenerPacientePorId(req.params.id);
    const obrasSociales = await ObraSocial.findAll();

    if (!paciente) {
      return res.status(404).send('Paciente no encontrado');
    }

    res.render('modificarPaciente', {
      mainClass: '',
      obrasSociales,
      paciente
    });
  } catch (error) {
    console.error('Error al cargar paciente:', error);
    res.status(500).send('Error al cargar paciente');
  }
});

router.post('/editar/:id', async (req, res) => {
  try {
    await pacienteController.editarPaciente(req.params.id, req.body);
    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al editar paciente:', error);
    res.status(400).send(error.message);
  }
});

// BAJA LOGICA PACIENTE
router.get('/bajaPaciente/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    // Alternar el estado (Activo : Inactivo)
    paciente.estado = !paciente.estado;
    await paciente.save();

    res.redirect('/pacientes');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cambiar el estado del paciente');
  }
});



module.exports = router;
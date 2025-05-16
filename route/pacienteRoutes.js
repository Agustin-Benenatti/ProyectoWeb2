const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// RUTA PARA MOSTRAR TODOS PACIENTES EN LA TABLA
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
router.get('/crearPaciente',(req, res) => {

  res.render('crearPaciente', {mainClass: ''})
});

// RUTA PARA PROCESAR EL FORMULARIO Y CARGAR EL PACIENTE
router.post('/cargar', async (req, res) => {
  try {
    // Intentar crear paciente
    await pacienteController.crearPaciente(req.body);
    console.log(req.body);
    res.redirect('/pacientes');
    
  } catch (error) {
    
    
    console.error('Error al guardar paciente:', error);
    res.status(400).send(error.message || 'Error al guardar el paciente');
  }
});



module.exports = router;
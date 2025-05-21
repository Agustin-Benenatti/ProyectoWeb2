const express = require('express');
const router = express.Router();
const admisionController = require('../controllers/admisionController');

// Panel de admision
router.get('/', admisionController.mostrarPanel);

// Mostrar formulario
router.get('/nueva', admisionController.mostrarFormulario);

// Buscar paciente por DNI
router.post('/buscar-paciente', admisionController.buscarPaciente);

// Crear nueva admision
router.post('/crear', admisionController.crearAdmision);

module.exports = router;
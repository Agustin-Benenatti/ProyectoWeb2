const express = require('express');
const router = express.Router();

const internacionController = require('../controllers/internacionController');

// Mostrar panel principal
router.get('/', internacionController.mostrarListaInternacion);

// Mostrar lista de internaciones
router.get('/lista', internacionController.mostrarListaInternacion);

// Mostrar formulario para generar internación
router.get('/generar-internacion/:id_admision', internacionController.mostrarFormularioInternacion);

// Procesar creación de internación
router.post('/crear', internacionController.crearInternacion);

module.exports = router;
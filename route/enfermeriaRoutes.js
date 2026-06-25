const express = require('express');
const router = express.Router();
const enfermeriaController = require('../controllers/enfermeriaController');

// 1. Mostrar la tabla principal
router.get('/', enfermeriaController.mostrarPanelEnfermeria);

// 2. Mostrar el formulario de evaluación (GET)
router.get('/evaluar/:id_internacion', enfermeriaController.mostrarFormularioEvaluacion);

// 3. RECIBIR y GUARDAR los datos del formulario (POST) <-- Esta es la que evita el error 404
router.post('/evaluar/:id_internacion', enfermeriaController.guardarEvaluacion);

module.exports = router;
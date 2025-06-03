const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const {pacienteValidation} = require('../validators/pacienteValidator');
const validarResultados = require('../middlewares/validarResultados');

// Ruta para mostrar los pacientes
router.get('/', pacienteController.mostrarPacientes);

// Ruta para mostrar el formulario para cargar un paciente
router.get('/crear', pacienteController.mostrarFormularioCrear);

// Ruta que procesa la creacion
router.post('/cargar', pacienteValidation(), validarResultados('admision/crearPaciente'), pacienteController.crearPaciente);

// Ruta para mostrar formulario de edicion
router.get('/editar/:id', pacienteController.mostrarFormularioEditar);

// Ruta que procesa la informacion que se edito
router.post('/editar/:id', pacienteValidation(), validarResultados('modificarPaciente'), pacienteController.editarPaciente);

// Ruta para baja logica del paciente
router.post('/baja/:id', pacienteController.bajaLogica);

module.exports = router;
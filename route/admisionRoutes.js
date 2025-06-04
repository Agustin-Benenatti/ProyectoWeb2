const express = require('express');
const router = express.Router();
const admisionController = require('../controllers/admisionController');
const {validarDniBusqueda} = require('../validators/pacienteValidator');
const validarResultados = require('../middlewares/validarResultados');


// Panel de admision
router.get('/', admisionController.mostrarPanel);

// Mostrar formulario
router.get('/nueva', admisionController.mostrarFormulario);

// Buscar paciente por DNI
router.post('/buscar-paciente',validarDniBusqueda,validarResultados('generarAdmision') ,admisionController.buscarPaciente);

// Crear nueva admision
router.post('/crear', admisionController.crearAdmision);

// Ruta a mi lista de admisiones
router.get('/listaAdmisiones', admisionController.mostrarPacientesAdmitidos);

// Ruta para mi baja logica de Admisiones
router.get('/baja/:id', admisionController.darDeBajaAdmision);

//Mostar formulario para NN
router.get('/nn', admisionController.mostrarFormularioNN);

router.post('/nn', admisionController.crearAdmisionNN);

module.exports = router;
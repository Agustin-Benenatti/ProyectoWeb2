const express = require('express');
const router = express.Router();
const { obtenerHabitaciones } = require('../controllers/habitacionController');

router.get('/', obtenerHabitaciones);

module.exports = router;
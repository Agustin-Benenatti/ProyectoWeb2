const Paciente  = require('../models/PacienteModels');

const obtenerPacientes = async () => {
  return await Paciente.findAll();
};

module.exports = {
  obtenerPacientes
};


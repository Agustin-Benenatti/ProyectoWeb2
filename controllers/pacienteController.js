const Paciente  = require('../models/PacienteModels');

const obtenerPacientes = async () => {
  return await Paciente.findAll();

};

const crearPaciente = async (data) => {
  try {
    // Validación simple para campos requeridos
    const camposObligatorios = ['nombre', 'apellido', 'sexo', 'dni', 'altura', 'peso','obra_social', 'Fecha_Nacimiento', 'Direccion', 'Telefono',];
    
    // Verificar que todos los campos obligatorios estén presentes
    for (let campo of camposObligatorios) {
      if (!data[campo]) {
        throw new Error(`El campo ${campo} es obligatorio`);
      }
    }

    // Si todos los campos son válidos, crea el paciente
    await Paciente.create(data);
  } catch (error) {
    console.error('Error al crear paciente:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado en el controlador de rutas
  }
};
module.exports = {
  obtenerPacientes,
  crearPaciente
};


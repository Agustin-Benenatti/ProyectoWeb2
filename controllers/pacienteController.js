const Paciente  = require('../models/PacienteModels');
const ObraSocial = require('../models/ObraSocialModels');

const obtenerPacientes = async () => {
  return await Paciente.findAll({
    include: {
      model: ObraSocial,
      attributes: ['nombre']  //solo traigo el nombre de la tabla obra_social para mostrarlo 
    }
  });

};

const crearPaciente = async (data) => {
  try {
    // Validación simple para campos requeridos
    const camposObligatorios = ['nombre', 'apellido', 'sexo', 'dni', 'altura', 'peso', 'fecha_nacimiento', 'direccion', 'telefono',];
    
    // Verificar que todos los campos obligatorios estén presentes
    for (let campo of camposObligatorios) {
      if (!data[campo]) {
        throw new Error(`El campo ${campo} es obligatorio`);
      }
    }
    //si el paciente no tiene obra social o viene vacio, le asigno null para que no me tire error FK
     if (!data.id_obra_social || data.id_obra_social === '') {
      data.id_obra_social = null;
     }

    // Si todos los campos son válidos, crea el paciente
    await Paciente.create(data);
  } catch (error) {
    if (error.original && error.original.code === 'ER_DUP_ENTRY' && error.original.sqlMessage.includes('paciente.dni')) {
      // Error de DNI duplicado
      const mensajeError = 'Ya existe un paciente con ese DNI.';
      console.error(mensajeError);
      throw new Error(mensajeError);  
    } else {
      console.error('Error al crear paciente:', error);
      throw error; // Otros errores
    }
  }
};

// obtener el paciente por el id 
const obtenerPacientePorId = async (id) => {
  return await Paciente.findByPk(id);
};

// editar paciente
const editarPaciente = async (id, data) => {
  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      throw new Error('Paciente no encontrado');
    }

    if (!data.id_obra_social || data.id_obra_social === '') {
      data.id_obra_social = null;
    }

    await paciente.update(data);
  } catch (error) {
    if (error.original?.code === 'ER_DUP_ENTRY' && error.original.sqlMessage.includes('paciente.dni')) {
      throw new Error('Ya existe un paciente con ese DNI.');
    } else {
      console.error('Error al editar paciente:', error);
      throw error;
    }
  }
};

module.exports = {
  obtenerPacientes,
  crearPaciente,
  obtenerPacientePorId,
  editarPaciente
};


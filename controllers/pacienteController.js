const Paciente = require('../models/PacienteModels');
const ObraSocial = require('../models/ObraSocialModels');

// Mostrar todos los pacientes
const mostrarPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({
      include: { model: ObraSocial, attributes: ['nombre'] }
    });
    res.render('Paciente', { mainClass: '', pacientes });
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).send('Error al obtener pacientes');
  }
};

// Mostrar formulario para crear paciente
const mostrarFormularioCrear = async (req, res) => {
  try {
    const obrasSociales = await ObraSocial.findAll();
    const dni = req.query.dni || '';
    res.render('crearPaciente', { mainClass: '', obrasSociales, dni});
  } catch (error) {
    console.error('Error al cargar obras sociales:', error);
    res.status(500).send('Error al cargar formulario');
  }
};

// Crear paciente
const crearPaciente = async (req, res) => {
  try {
    const data = req.body;

    if (!data.id_obra_social || data.id_obra_social === '') {
      data.id_obra_social = null;
    }

    // Manejar peso (opcional)
    if (data.peso && data.peso.trim() !== '') {
      data.peso = parseFloat(data.peso.replace(',', '.'));
      if (isNaN(data.peso)) throw new Error('Peso inválido');
    } else {
      data.peso = null;
    }

    // Manejar altura (opcional)
    if (data.altura && data.altura.trim() !== '') {
      data.altura = parseFloat(data.altura.replace(',', '.'));
      if (isNaN(data.altura)) throw new Error('Altura inválida');
    } else {
      data.altura = null;
    }

    await Paciente.create(data);
    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(400).send(error.message);
  }
};

// Mostrar formulario de edición
const mostrarFormularioEditar = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    const obrasSociales = await ObraSocial.findAll();

    if (!paciente) return res.status(404).send('Paciente no encontrado');

    res.render('modificarPaciente', { mainClass: '', obrasSociales, paciente });
  } catch (error) {
    console.error('Error al cargar paciente:', error);
    res.status(500).send('Error al cargar paciente');
  }
};

// Editar paciente
const editarPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    const data = req.body;

    // No permitir cambiar el DNI
    if ('dni' in data) delete data.dni;

    if (!data.id_obra_social || data.id_obra_social === '') {
      data.id_obra_social = null;
    }

    // Manejar peso (opcional)
    if (data.peso && data.peso.trim() !== '') {
      data.peso = parseFloat(data.peso.replace(',', '.'));
      if (isNaN(data.peso)) throw new Error('Peso inválido');
    } else {
      data.peso = null;
    }

    // Manejar altura (opcional)
    if (data.altura && data.altura.trim() !== '') {
      data.altura = parseFloat(data.altura.replace(',', '.'));
      if (isNaN(data.altura)) throw new Error('Altura inválida');
    } else {
      data.altura = null;
    }

    await paciente.update(data);
    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al editar paciente:', error);
    res.status(400).send(error.message);
  }
};

// Baja logica
const bajaLogica = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    paciente.estado = !paciente.estado;
    await paciente.save();

    res.redirect('/pacientes');
  } catch (error) {
    console.error('Error al cambiar estado del paciente:', error);
    res.status(500).send('Error al cambiar estado');
  }
};

module.exports = {
  mostrarPacientes,
  mostrarFormularioCrear,
  crearPaciente,
  mostrarFormularioEditar,
  editarPaciente,
  bajaLogica
};

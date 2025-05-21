const TipoAdmision = require('../models/TipoAdmisionModels');
const Paciente = require('../models/PacienteModels');
const Admision = require('../models/AdmisionModels');

// Mostrar panel de admisión
const mostrarPanel = (req, res) => {
  res.render('admision', { mainClass: '' });
};

// Mostrar formulario de admision
const mostrarFormulario = async (req, res) => {
  try {
    const tiposAdmision = await TipoAdmision.findAll();
    const mensajeExito = req.query.exito ? 'Admisión creada correctamente.' : null;

    res.render('generarAdmision', { mainClass: '', tiposAdmision, mensajeExito});
  } catch (error) {
    console.error('Error al cargar formulario de admision:', error);
    res.status(500).send('Error al cargar formulario de admision');
  }
};

// Buscar paciente por DNI
const buscarPaciente = async (req, res) => {
  try {
    const { dni } = req.body;
    const paciente = await Paciente.findOne({ where: { dni } });
    const tiposAdmision = await TipoAdmision.findAll();

    if (paciente) {
      res.render('generarAdmision', { mainClass: '', paciente, tiposAdmision });
    } else {
      res.render('generarAdmision', { mainClass: '', mensaje: 'Paciente no encontrado.', tiposAdmision });
    }
  } catch (error) {
    console.error('Error al buscar paciente:', error);
    res.status(500).send('Error al buscar paciente');
  }
};

const crearAdmision = async (req, res) => {
  try {
    const { fecha_admision, estado, id_tipo_admision, id_paciente } = req.body;
    const estadoBooleano = estado === '1';

    await Admision.create({
      fecha_admision,
      estado: estadoBooleano,
      id_tipo_admision,
      id_paciente
    });

    res.redirect('/admision/nueva?exito=1');
  } catch (error) {
    console.error('Error al crear la admisión:', error);
    res.status(500).send('Error al crear la admisión');
  }
};

module.exports = {
  mostrarPanel,
  mostrarFormulario,
  buscarPaciente,
  crearAdmision
};
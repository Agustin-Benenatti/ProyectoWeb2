const Internacion = require('../models/InternacionModels');
const Habitacion = require('../models/HabitacionModels');
const MotivoInternacion = require('../models/MotivoInternacionModels');
const Admision = require('../models/AdmisionModels');
const Paciente = require('../models/PacienteModels');
const ObraSocial = require('../models/ObraSocialModels');
const TipoAdmision = require('../models/TipoAdmisionModels');
const Cama = require('../models/CamaModels');
const AsignacionCama = require('../models/AsignacionCamaModels');
const Ala = require('../models/AlaModels');

const mostrarPanelInternacion = async (req, res) => {
  try {
    const pacientes = await Admision.findAll({
      include: [
        {
          model: Paciente,
          include: [ObraSocial]
        },
        TipoAdmision
      ],
      where: {
        estado: true
      }
    });

    const mensajeExito = req.query.mensajeExito || null;

    res.render('internacion', {
      pacientes,
      mensajeExito,
      mainClass: ''
    });
  } catch (error) {
    console.error('Error al cargar el panel de internación:', error);
    res.status(500).send('Error al mostrar la internación');
  }
};

const mostrarFormularioInternacion = async (req, res) => {
  try {
    const { id_admision } = req.params;

    const admision = await Admision.findByPk(id_admision, {
      include: [
        {
          model: Paciente,
          include: [ObraSocial]
        },
        TipoAdmision
      ]
    });

    const habitaciones = await Habitacion.findAll({
      attributes: ['id_habitacion', 'nro_habitacion', 'id_ala'],
      include: [
        {
          model: Ala,
          attributes: ['id_ala', 'nombre_ala']
        },
        {
          model: Cama,
          where: { estado: true },
          required: false,
          attributes: ['id_cama', 'numero_cama', 'estado']
        }
      ],
      order: [['id_ala', 'ASC'], ['nro_habitacion', 'ASC']]
    });

    const motivos = await MotivoInternacion.findAll({
      attributes: ['id_motivo_internacion', 'nombre_motivo']
    });

    const alas = await Ala.findAll({
      attributes: ['id_ala', 'nombre_ala'],
      order: [['nombre_ala', 'ASC']]
    });

    res.render('generarInternacion', {
      admision,
      habitaciones,
      motivos,
      alas,
      mainClass: ''
    });

  } catch (error) {
    console.error('Error al mostrar el formulario de internación:', error);
    res.status(500).send('Error al cargar el formulario de internación');
  }
};

const crearInternacion = async (req, res) => {
  try {
    const {
      id_admision,
      id_habitacion,
      id_motivo_internacion,
      fecha_ingreso,
      estado,
      id_cama
    } = req.body;

    const nuevaInternacion = await Internacion.create({
      id_admision,
      id_habitacion,
      id_motivo_internacion,
      fecha_ingreso,
      estado: estado === 'true'
    });

    await AsignacionCama.create({
      id_internacion: nuevaInternacion.id_internacion,
      id_cama
    });

    await Cama.update(
      { estado: false },
      { where: { id_cama } }
    );

    res.redirect('/internacion?mensajeExito=Internación y cama asignadas con éxito');
  } catch (error) {
    console.error('Error al crear internación:', error);
    res.status(500).send('Error al registrar la internación');
  }
};

const mostrarListaInternacion = async (req, res) => {
  try {
    const internaciones = await Internacion.findAll({
      include: [
        {
          model: Admision,
          include: [
            {
              model: Paciente,
              attributes: ['nombre', 'apellido', 'dni']
            }
          ]
        },
        {
          model: Habitacion,
          attributes: ['nro_habitacion']
        },
        {
          model: MotivoInternacion,
          attributes: ['nombre_motivo'] // atributo correcto
        },
        {
          model: AsignacionCama,
          include: [
            {
              model: Cama,
              attributes: ['numero_cama']
            }
          ]
        }
      ]
    });

    res.render('internacion', {
      internaciones,
      mainClass: '',
      mensajeExito: req.query.mensajeExito || null
    });

  } catch (error) {
    console.error('Error al cargar la lista de internaciones:', error.message);
    console.error(error);
    res.status(500).send('Error al cargar las internaciones');
  }
};

module.exports = {
  mostrarFormularioInternacion,
  crearInternacion,
  mostrarPanelInternacion,
  mostrarListaInternacion
};
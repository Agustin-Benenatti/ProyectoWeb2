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
    const id_ala = req.query.id_ala ? parseInt(req.query.id_ala) : null;
    const nro_habitacion = req.query.nro_habitacion ? parseInt(req.query.nro_habitacion) : null;

    const admision = await Admision.findByPk(id_admision, {
      include: [
        {
          model: Paciente,
          include: [ObraSocial]
        },
        TipoAdmision
      ]
    });

    if (!admision || !admision.Paciente) {
      return res.status(404).send('Admisión o paciente no encontrado');
    }

    const sexoPacienteActual = admision.Paciente.sexo;

    let habitacionWhere = { estado: true };
    if (id_ala) habitacionWhere.id_ala = id_ala;
    if (nro_habitacion) habitacionWhere.nro_habitacion = nro_habitacion;

    const habitaciones = await Habitacion.findAll({
      include: [
        {
          model: Cama,
          as: 'Camas',
          where: { estado: true },
          required: true,
          attributes: ['id_cama', 'numero_cama', 'estado']
        },
        {
          model: Ala,
          as: 'Ala',
          attributes: ['id_ala', 'nombre_ala']
        },
        {
          model: Internacion,
          required: false,
          where: { estado: true },
          include: [{
            model: Admision,
            include: [{
              model: Paciente,
              attributes: ['sexo']
            }]
          }]
        }
      ],
      where: habitacionWhere,
      order: [
        [{ model: Ala, as: 'Ala' }, 'nombre_ala', 'ASC'],
        ['nro_habitacion', 'ASC']
      ],
      distinct: true,
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
      sexoPacienteActual,
      mainClass: '',
      error: null
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

    // Obtener el sexo del paciente a internar
    const admision = await Admision.findByPk(id_admision, {
      include: [{ model: Paciente }]
    });
    const sexoPaciente = admision.Paciente.sexo;

    // Obtener sexos de pacientes ya internados en esa habitación
    const internaciones = await Internacion.findAll({
      where: { id_habitacion, estado: true },
      include: [{
        model: Admision,
        include: [{ model: Paciente, attributes: ['sexo'] }]
      }]
    });

    const sexosEnHabitacion = internaciones.map(i => i.Admision.Paciente.sexo);

    if (sexosEnHabitacion.length > 0 && !sexosEnHabitacion.every(s => s === sexoPaciente)) {
      // Obtener datos para recargar el formulario con error
      const admision = await Admision.findByPk(id_admision, {
        include: [
          {
            model: Paciente,
            include: [ObraSocial]
          },
          TipoAdmision
        ]
      });

      const sexoPacienteActual = admision.Paciente.sexo;

      // Traer habitaciones con camas disponibles
      const habitaciones = await Habitacion.findAll({
        include: [
          {
            model: Cama,
            as: 'Camas',
            where: { estado: true }, // solo camas disponibles
            required: true,
            attributes: ['id_cama', 'numero_cama', 'estado']
          },
          {
            model: Ala,
            as: 'Ala',
            attributes: ['id_ala', 'nombre_ala']
          }
        ],
        where: { estado: true }, // habitaciones activas
        order: [
          [{ model: Ala, as: 'Ala' }, 'nombre_ala', 'ASC'],
          ['nro_habitacion', 'ASC']
        ],
        distinct: true,
      });

      const motivos = await MotivoInternacion.findAll({
        attributes: ['id_motivo_internacion', 'nombre_motivo']
      });

      const alas = await Ala.findAll({
        attributes: ['id_ala', 'nombre_ala'],
        order: [['nombre_ala', 'ASC']]
      });

      return res.status(400).render('generarInternacion', {
        admision,
        habitaciones,
        motivos,
        alas,
        sexoPacienteActual,
        mainClass: '',
        error: `No se puede internar paciente de sexo diferente en la habitación nro ${id_habitacion}.`
      });
    }

    // Si pasa la validación, se genera la internacion
    const nuevaInternacion = await Internacion.create({
      id_admision,
      id_habitacion,
      id_motivo_internacion,
      fecha_ingreso,
      estado: estado === 'true'
    });

    // Asignar cama y actualizar estado cama
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
          attributes: ['nombre_motivo'] 
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

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

    const internacionActiva = await Internacion.findOne({
      where: {
        id_admision,
        estado: true
      }
    });

    let habitacionWhere = { estado: true };
    if (id_ala) habitacionWhere.id_ala = id_ala;
    if (nro_habitacion) habitacionWhere.nro_habitacion = nro_habitacion;

    const habitaciones = await Habitacion.findAll({
      include: [
        {
          model: Cama,
          as: 'Camas',
          where: 
          { estado: true, 
            higiene: true
          },
          required: true,
          attributes: ['id_cama', 'numero_cama', 'estado', 'higiene']
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
    error: null,
    internacionActiva: !!internacionActiva,
    yaInternado: !!internacionActiva  
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

    if (!id_admision || !id_habitacion || !id_motivo_internacion || !fecha_ingreso || !id_cama) {
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
          }
        ],
        where: { estado: true },
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
        sexoPacienteActual: admision.Paciente.sexo,
        mainClass: '',
        error: 'Todos los campos son obligatorios.',
        internacionActiva: false
      });
    }

    // Validacion: la fecha de ingreso no puede ser posterior a la actual
    const fechaIngresada = new Date(fecha_ingreso);
    const fechaActual = new Date();
    fechaIngresada.setHours(0, 0, 0, 0);
    fechaActual.setHours(0, 0, 0, 0);

    if (fechaIngresada > fechaActual) {
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
          }
        ],
        where: { estado: true },
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
        sexoPacienteActual: admision.Paciente.sexo,
        mainClass: '',
        error: 'La fecha de ingreso no puede ser posterior a la fecha actual.',
        internacionActiva: false
      });
    }

      // Verificamos si ya existe una internación activa para esta admisión
  
      const admisionActual = await Admision.findByPk(id_admision);
      if (!admisionActual) {
        return res.status(404).send('Admisión no encontrada');
      }
      const id_paciente = admisionActual.id_paciente;

      // Verificamos si ya existe una internación activa para ese paciente
      const internacionExistente = await Internacion.findOne({
        where: { estado: true },
        include: {
          model: Admision,
          where: { id_paciente }
        }
      });

      if (internacionExistente) {
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
            }
          ],
          where: { estado: true },
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
          sexoPacienteActual: admision.Paciente.sexo,
          mainClass: '',
          error: 'El paciente ya posee una internación activa.',
          internacionActiva: true
        });
      }

    // creo la internacion
    const nuevaInternacion = await Internacion.create({
      id_admision,
      id_habitacion,
      id_motivo_internacion,
      fecha_ingreso,
      estado
    });

    //creo la asignacion de la cama 
    await AsignacionCama.create({
      id_internacion: nuevaInternacion.id_internacion,
      id_cama
    });

    //actualizo el estado de la cama a false("ocupado")
    await Cama.update(
      { estado: false },
      { where: { id_cama } }
    );

    res.redirect('/internacion?mensajeExito=Internación creada correctamente');

  } catch (error) {
    console.error('Error al crear la internación:', error);
    res.status(500).send('Error interno del servidor');
  }
};



const mostrarListaInternacion = async (req, res) => {
  try {
    const internaciones = await Internacion.findAll({
      where: {estado:true}, //solo muestro las internaciones activas
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
    res.status(500).send('Error al cargar las internaciones');
  }
};

const darAltaInternacion = async (req, res) => {
  try {
    const { id_internacion } = req.params;

    const internacion = await Internacion.findByPk(id_internacion);

    if (!internacion || !internacion.estado) {
      return res.redirect('/internacion?mensajeError=La internación ya fue dada de alta o no existe');
    }

    // Actualizar internación (fecha de salida y estado)
    internacion.estado = false;
    internacion.fecha_salida = new Date();
    await internacion.save();

    // Buscar y liberar cama asociada
    const asignacion = await AsignacionCama.findOne({
      where: { id_internacion: id_internacion },
    });

    if (asignacion) {
      await Cama.update(
        { estado: true }, // La cama queda libre
        { where: { id_cama: asignacion.id_cama } }
      );
    }

    res.redirect('/internacion?mensajeExito=Internación dada de alta correctamente');
  } catch (error) {
    console.error('Error al dar de alta la internación:', error);
    res.status(500).send('Error interno al dar de alta la internación');
  }
};

module.exports = {
  mostrarFormularioInternacion,
  crearInternacion,
  mostrarPanelInternacion,
  mostrarListaInternacion,
  darAltaInternacion,
};

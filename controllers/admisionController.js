const TipoAdmision = require('../models/TipoAdmisionModels');
const Paciente = require('../models/PacienteModels');
const Admision = require('../models/AdmisionModels');
const ObraSocial = require('../models/ObraSocialModels');

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
      const mensaje = `Paciente no encontrado. ¿Desea registrarlo?`;
      res.render('generarAdmision', { mainClass: '', mensaje, tiposAdmision, dni });
    }
  } catch (error) {
    console.error('Error al buscar paciente:', error);
    res.status(500).send('Error al buscar paciente');
  }
};

//Crear admision y redirigir a la consulta de admisiones
const crearAdmision = async (req, res) => {
  try {
    const { fecha_admision, estado, id_tipo_admision, id_paciente } = req.body;
    const estadoBooleano = estado === '1';

    // Validar que la fecha sea válida
    const fechaAdmisionDate = new Date(fecha_admision);
    if (isNaN(fechaAdmisionDate)) {
      const tiposAdmision = await TipoAdmision.findAll();
      return res.status(400).render('generarAdmision', {
        mainClass: '',
        paciente: { id_paciente },
        tiposAdmision,
        errores: [{ msg: 'La fecha de admisión no es válida.' }]
      });
    }

    // Validar que la fecha no sea anterior a hoy
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Ignorar horas para comparar solo fecha

    if (fechaAdmisionDate < hoy) {
      const tiposAdmision = await TipoAdmision.findAll();
      return res.status(400).render('generarAdmision', {
        mainClass: '',
        paciente: { id_paciente },
        tiposAdmision,
        errores: [{ msg: 'La fecha de admisión no puede ser anterior a hoy.' }]
      });
    }

    // Crear la admisión
    await Admision.create({
      fecha_admision,
      estado: estadoBooleano,
      id_tipo_admision,
      id_paciente
    });

    res.redirect('/admision/listaAdmisiones?exito=1'); 
  } catch (error) {
    console.error('Error al crear la admisión:', error);
    res.status(500).send('Error al crear la admisión');
  }
};



// Muestro mi lista de pacientes con estado de admision "ADMITIDO"
const mostrarPacientesAdmitidos = async (req, res) => {
  try {
    const admisiones = await Admision.findAll({
      where:{estado: true},
      include: [
        {
          model: Paciente,
          include: [ObraSocial]
        },
        TipoAdmision
      ],
      
    });

    const mensajeExito = req.query.exito ? 'Admisión creada correctamente.' : null;

    res.render('listaAdmisiones', { pacientes: admisiones, mensajeExito });
  } catch (error) {
    console.error('Error al obtener admisiones:', error);
    res.status(500).send('Error al obtener admisiones');
  }
};

// Hago la baja logica de una admision, le cambio el estado a "CANCELADO" y se me elimina de la 
// lista de pacientes "ADMITIDOS"
const darDeBajaAdmision = async (req, res) => {
  try {
    const { id } = req.params;

    await Admision.update(
      { estado: false },
      { where: { id_admision: id } }
    );

    res.redirect('/admision/listaAdmisiones');
  } catch (error) {
    console.error('Error al dar de baja la admisión:', error);
    res.status(500).send('Error al dar de baja la admisión');
  }
};

module.exports = {
  mostrarPanel,
  mostrarFormulario,
  buscarPaciente,
  crearAdmision,
  mostrarPacientesAdmitidos,
  darDeBajaAdmision
};
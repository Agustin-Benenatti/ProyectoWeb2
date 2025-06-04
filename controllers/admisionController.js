const TipoAdmision = require('../models/TipoAdmisionModels');
const Paciente = require('../models/PacienteModels');
const Admision = require('../models/AdmisionModels');
const ObraSocial = require('../models/ObraSocialModels');
const Internacion = require('../models/InternacionModels'); 

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
    const { estado, id_tipo_admision, id_paciente } = req.body;
    const estadoBooleano = estado === '1';

    // Establecer la fecha de admisión como la fecha actual (UTC normalizada)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); 

    // Crear la admisión
    await Admision.create({
      fecha_admision: hoy,
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


// Muestro mi lista de pacientes con estado de admision "ADMITIDO" y sin internacion
const mostrarPacientesAdmitidos = async (req, res) => {
  try {
    const admisiones = await Admision.findAll({
      where:{estado: true},
      include: [
        {
          model: Internacion,
          required: false  
        },
        {
          model: Paciente,
          include: [ObraSocial]
        },
        TipoAdmision
      ],
    });

    // Filtrar admisiones que NO tienen internacion
    const admisionesSinInternacion = admisiones.filter(adm => !adm.Internacion);

    const mensajeExito = req.query.exito ? 'Admisión creada correctamente.' : null;

    res.render('listaAdmisiones', { pacientes: admisionesSinInternacion, mensajeExito });
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

// Mostrar formulario de admisión NN
const mostrarFormularioNN = async (req, res) => {
  try {
    const tiposAdmision = await TipoAdmision.findAll();
    const mensajeExito = req.query.exito ? 'Admisión NN creada correctamente.' : null;

    res.render('generarAdmisionNN', { tiposAdmision, mensajeExito });
  } catch (error) {
    console.error('Error al cargar formulario NN:', error);
    res.status(500).send('Error al cargar formulario NN');
  }
};

//Admision para el paciente NN
const crearAdmisionNN = async (req, res) => {
  try {
    // Crear un paciente NN con datos genéricos
    const pacienteNN = await Paciente.create({
      nombre: 'NN',
      apellido: 'NN',
      sexo: 'Sin especificar',
      dni: 'NN-' + Date.now(), // algo único
      fecha_nacimiento: new Date(), // se puede ajustar
      direccion: 'Desconocida',
      telefono: '0000000000',
      pacientenn: true,
      estado: true
    });

    // Crear admisión para el paciente NN
    await Admision.create({
      fecha_admision: new Date(),
      estado: true,
      id_tipo_admision: 1, // podés ajustar esto o pasarlo por body
      id_paciente: pacienteNN.id_paciente
    });

    res.redirect('/admision/listaAdmisiones?exito=1');
  } catch (error) {
    console.error('Error al crear admisión NN:', error);
    res.status(500).send('Error al crear admisión NN');
  }
};

module.exports = {
  mostrarPanel,
  mostrarFormulario,
  buscarPaciente,
  crearAdmision,
  mostrarPacientesAdmitidos,
  darDeBajaAdmision,
  mostrarFormularioNN,
  crearAdmisionNN,
};

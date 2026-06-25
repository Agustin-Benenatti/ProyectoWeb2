const Admision = require('../models/AdmisionModels');
const Paciente = require('../models/PacienteModels');
const TipoAdmision = require('../models/TipoAdmisionModels');
const Internacion = require('../models/InternacionModels');
const EvaluacionEnfermeria = require('../models/EvaluacionEnfermeriaModels');
const Enfermero = require('../models/EnfermeroModels');
const CuidadosPaciente = require('../models/CuidadosPacienteModels')

const mostrarPanelEnfermeria = async (req, res) => {
  try {
    // Buscamos todas las admisiones activas
    const admisiones = await Admision.findAll({
      where: { estado: true },
      include: [
        {
          model: Paciente,
          attributes: ['nombre', 'apellido', 'dni']
        },
        {
          model: TipoAdmision,
          attributes: ['nombre'] 
        },
        {
          model: Internacion,
          required: false // Trae la admisión incluso si no tiene internación
        }
      ]
    });

    // Filtramos dejando SOLO las admisiones que NO tienen internación
    const admisionesPendientes = admisiones.filter(adm => !adm.Internacion);

    res.render('personal-enfermeria', {
      mainClass: '',
      admisionesPendientes
    });
  } catch (error) {
    console.error('Error al cargar pacientes para enfermeria:', error);
    res.status(500).send('Error al cargar el panel de enfermería');
  }
};

const mostrarFormularioEvaluacion = async (req, res) => {
  try {
    const { id_internacion } = req.params;

    const internacion = await Internacion.findByPk(id_internacion, {
      include: [
        {
          model: Admision,
          include: [{ model: Paciente, attributes: ['nombre', 'apellido', 'dni', 'fecha_nacimiento'] }]
        }
      ]
    });

    if (!internacion) return res.status(404).send('Internación no encontrada');

    // 1. Buscamos el catálogo de cuidados
    const listaCuidados = await CuidadosPaciente.findAll();

    // 2. Pasamos la lista a la vista
    res.render('evaluacionEnfermeria', {
      mainClass: '',
      internacion,
      listaCuidados 
    });

  } catch (error) {
    console.error('Error al cargar formulario de evaluación:', error);
    res.status(500).send('Error interno del servidor');
  }
};

const guardarEvaluacion = async (req, res) => {
    try{
        const {id_internacion} = req.params;
        const{
            sintomas,
            presion_arterial,
            frecuencia_cardiaca,
            frecuencia_respiratoria,
            temperatura,
            plan_cuidados,
            id_cuidado_paciente

        }= req.body;

        await EvaluacionEnfermeria.create({
            id_internacion,
            sintomas,
            presion_arterial: presion_arterial || null,
            frecuencia_cardiaca: frecuencia_cardiaca ? parseInt(frecuencia_cardiaca) : null,
            frecuencia_respiratoria: frecuencia_respiratoria ? parseInt(frecuencia_respiratoria) : null,
            temperatura: temperatura ? parseFloat(temperatura) : null,
            plan_cuidados: plan_cuidados,
            id_cuidado_paciente: id_cuidado_paciente,
            observaciones: 'Evaluación inicial cargada por sistema.',
            id_enfermero: 1
            
        });

        res.redirect('/enfermeria')

    }catch (error){
        console.error('Error al guardar la evaluación de enfermeria:', error);
        res.status(500).send('Ocurrio un error al intentar guardar los datos.')
    }
};

module.exports = {
  mostrarPanelEnfermeria,
  mostrarFormularioEvaluacion,
  guardarEvaluacion
};
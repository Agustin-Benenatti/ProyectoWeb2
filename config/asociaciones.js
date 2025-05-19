const Medico = require('../models/MedicoModels');
const Especializacion = require('../models/EspecializacionModels');
const ParteMedico = require('../models/ParteMedico');
const Diagnostico = require('../models/DiagnosticoModels');
const Tratamiento = require('../models/Tratamiento');
const Internacion = require('../models/InternacionModels');
const MotivoInternacion = require('../models/MotivoInternacionModels');
const Habitacion = require('../models/HabitacionModels');
const Ala = require('../models/AlaModels');
const Cama = require('../models/CamaModels');
const Paciente = require('../models/PacienteModels');
const ObraSocial = require('../models/ObraSocialModels');
const ContactoEmergencia = require('../models/ContactoEmergenciaModels');
const HistorialMedico = require('../models/HistorialMedicoModels');
const Admision = require('../models/AdmisionModels');
const TipoAdmision = require('../models/TipoAdmisionModels');
const Enfermero = require('../models/EnfermeroModels');
const EvaluacionEnfermeria = require('../models/EvaluacionEnfermeriaModels');
const CuidadosPaciente = require('../models/CuidadosPacienteModels');

// MEDICO 1:N ParteMedico
Medico.hasMany(ParteMedico, { foreignKey: 'id_medico' });
ParteMedico.belongsTo(Medico, { foreignKey: 'id_medico' });

// MEDICO 1:N HistorialMedico
Medico.hasMany(HistorialMedico, { foreignKey: 'id_medico' });
HistorialMedico.belongsTo(Medico, { foreignKey: 'id_medico' });

// MEDICO N:1 Especializacion
Especializacion.hasMany(Medico, { foreignKey: 'id_especializacion' });
Medico.belongsTo(Especializacion, { foreignKey: 'id_especializacion' });

// PARTE_MEDICO N:1 Diagnostico
Diagnostico.hasMany(ParteMedico, { foreignKey: 'id_diagnostico' });
ParteMedico.belongsTo(Diagnostico, { foreignKey: 'id_diagnostico' });

// PARTE_MEDICO N:1 Tratamiento
Tratamiento.hasMany(ParteMedico, { foreignKey: 'id_tratamiento' });
ParteMedico.belongsTo(Tratamiento, { foreignKey: 'id_tratamiento' });

// PARTE_MEDICO N:1 Internacion
Internacion.hasMany(ParteMedico, { foreignKey: 'id_internacion' });
ParteMedico.belongsTo(Internacion, { foreignKey: 'id_internacion' });

// PACIENTE 1:N HistorialMedico
Paciente.hasMany(HistorialMedico, { foreignKey: 'id_paciente' });
HistorialMedico.belongsTo(Paciente, { foreignKey: 'id_paciente' });

// PACIENTE 1:N ContactoEmergencia
Paciente.hasMany(ContactoEmergencia, { foreignKey: 'id_paciente' });
ContactoEmergencia.belongsTo(Paciente, { foreignKey: 'id_paciente' });

// PACIENTE N:1 ObraSocial
ObraSocial.hasMany(Paciente, { foreignKey: 'id_obra_social' });
Paciente.belongsTo(ObraSocial, { foreignKey: 'id_obra_social' });

// INTERNACION N:1 Paciente
Paciente.hasMany(Internacion, { foreignKey: 'id_paciente' });
Internacion.belongsTo(Paciente, { foreignKey: 'id_paciente' });

// INTERNACION N:1 Habitacion
Habitacion.hasMany(Internacion, { foreignKey: 'id_habitacion' });
Internacion.belongsTo(Habitacion, { foreignKey: 'id_habitacion' });

// INTERNACION N:1 MotivoInternacion
MotivoInternacion.hasMany(Internacion, { foreignKey: 'id_motivo' });
Internacion.belongsTo(MotivoInternacion, { foreignKey: 'id_motivo' });

// HABITACION N:1 Ala
Ala.hasMany(Habitacion, { foreignKey: 'id_ala' });
Habitacion.belongsTo(Ala, { foreignKey: 'id_ala' });

// HABITACION 1:N Cama
Habitacion.hasMany(Cama, { foreignKey: 'id_habitacion' });
Cama.belongsTo(Habitacion, { foreignKey: 'id_habitacion' });

// ADMISION N:1 Internacion
Internacion.hasMany(Admision, { foreignKey: 'id_internacion' });
Admision.belongsTo(Internacion, { foreignKey: 'id_internacion' });

// ADMISION N:1 TipoAdmision
TipoAdmision.hasMany(Admision, { foreignKey: 'id_tipo_admision' });
Admision.belongsTo(TipoAdmision, { foreignKey: 'id_tipo_admision' });

// ADMISION N:1 Paciente
Paciente.hasMany(Admision, { foreignKey: 'id_paciente' });
Admision.belongsTo(Paciente, { foreignKey: 'id_paciente' });

// ENFERMERO 1:N EvaluacionEnfermeria
Enfermero.hasMany(EvaluacionEnfermeria, { foreignKey: 'id_enfermero' });
EvaluacionEnfermeria.belongsTo(Enfermero, { foreignKey: 'id_enfermero' });

// EVALUACION_ENFERMERIA N:1 CuidadosPaciente
CuidadosPaciente.hasMany(EvaluacionEnfermeria, { foreignKey: 'id_cuidados_paciente' });
EvaluacionEnfermeria.belongsTo(CuidadosPaciente, { foreignKey: 'id_cuidados_paciente' });

// EVALUACION_ENFERMERIA N:1 Admision
Admision.hasMany(EvaluacionEnfermeria, { foreignKey: 'id_admision' });
EvaluacionEnfermeria.belongsTo(Admision, { foreignKey: 'id_admision' });

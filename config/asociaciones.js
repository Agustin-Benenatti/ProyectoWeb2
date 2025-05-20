// MODELOS
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

// Asociación MEDICO
Medico.belongsTo(Especializacion, { foreignKey: 'id_especializacion' });
Especializacion.hasMany(Medico, { foreignKey: 'id_especializacion' });

Medico.hasMany(ParteMedico, { foreignKey: 'id_medico' });
ParteMedico.belongsTo(Medico, { foreignKey: 'id_medico' });

Medico.hasMany(HistorialMedico, { foreignKey: 'id_medico' });
HistorialMedico.belongsTo(Medico, { foreignKey: 'id_medico' });

// Asociación PARTE MEDICO
ParteMedico.belongsTo(Diagnostico, { foreignKey: 'id_diagnostico' });
Diagnostico.hasMany(ParteMedico, { foreignKey: 'id_diagnostico' });

ParteMedico.belongsTo(Tratamiento, { foreignKey: 'id_tratamiento' });
Tratamiento.hasMany(ParteMedico, { foreignKey: 'id_tratamiento' });

ParteMedico.belongsTo(Internacion, { foreignKey: 'id_internacion' });
Internacion.hasMany(ParteMedico, { foreignKey: 'id_internacion' });

// Asociación PACIENTE
Paciente.belongsTo(ObraSocial, { foreignKey: 'id_obra_social' });
ObraSocial.hasMany(Paciente, { foreignKey: 'id_obra_social' });

Paciente.hasMany(ContactoEmergencia, { foreignKey: 'id_paciente' });
ContactoEmergencia.belongsTo(Paciente, { foreignKey: 'id_paciente' });

Paciente.hasMany(HistorialMedico, { foreignKey: 'id_paciente' });
HistorialMedico.belongsTo(Paciente, { foreignKey: 'id_paciente' });

Paciente.hasMany(Admision, { foreignKey: 'id_paciente' });
Admision.belongsTo(Paciente, { foreignKey: 'id_paciente' });

// Asociación ADMISION
Admision.belongsTo(TipoAdmision, { foreignKey: 'id_tipo_admision' });
TipoAdmision.hasMany(Admision, { foreignKey: 'id_tipo_admision' });

Admision.hasOne(Internacion, { foreignKey: 'id_admision' });
Internacion.belongsTo(Admision, { foreignKey: 'id_admision' });

// Asociación INTERNACION
Internacion.belongsTo(Habitacion, { foreignKey: 'id_habitacion' });
Habitacion.hasMany(Internacion, { foreignKey: 'id_habitacion' });

Internacion.belongsTo(MotivoInternacion, { foreignKey: 'id_motivo' });
MotivoInternacion.hasMany(Internacion, { foreignKey: 'id_motivo' });

// Asociación HABITACION
Habitacion.belongsTo(Ala, { foreignKey: 'id_ala' });
Ala.hasMany(Habitacion, { foreignKey: 'id_ala' });

Habitacion.hasMany(Cama, { foreignKey: 'id_habitacion' });
Cama.belongsTo(Habitacion, { foreignKey: 'id_habitacion' });

// Asociación ENFERMERIA
Internacion.hasMany(EvaluacionEnfermeria, { foreignKey: 'id_internacion' });
EvaluacionEnfermeria.belongsTo(Internacion, { foreignKey: 'id_internacion' });

EvaluacionEnfermeria.belongsTo(Enfermero, { foreignKey: 'id_enfermero' });
Enfermero.hasMany(EvaluacionEnfermeria, { foreignKey: 'id_enfermero' });

EvaluacionEnfermeria.belongsTo(CuidadosPaciente, { foreignKey: 'id_cuidados_paciente' });
CuidadosPaciente.hasMany(EvaluacionEnfermeria, { foreignKey: 'id_cuidados_paciente' });
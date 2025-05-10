const Admision = require('../models/AdmisionModels');
const Cama = require('../models/CamaModels');
const Enfermero = require('../models/EnfermeroModels');
const EvaluacionEnfermeria = require('../models/EvaluacionEnfermeriaModels');
const Habitacion = require('../models/HabitacionModels');
const HistorialMedico = require('../models/HistorialMedicoModels');
const Internacion = require('../models/InternacionModels');
const Medico = require('../models/MedicoModels');
const Paciente = require('../models/PacienteModels');
const ParteMedico = require ('../models/ParteMedico');



Medico.hasMany(ParteMedico, { foreignKey: 'id_Medico' });
ParteMedico.belongsTo(Medico, { foreignKey: 'id_Medico' });

// Internacion 1:N ParteMedico
Internacion.hasMany(ParteMedico, { foreignKey: 'id_Medico' });
ParteMedico.belongsTo(Internacion, { foreignKey: 'id_Internacion' });

// Paciente 1:N HistorialMedico
Paciente.hasMany(HistorialMedico, { foreignKey: 'id_Paciente' });
HistorialMedico.belongsTo(Paciente, { foreignKey: 'id_Paciente' });

// Paciente 1:N Internacion
Paciente.hasMany(Internacion, { foreignKey: 'id_Paciente' });
Internacion.belongsTo(Paciente, { foreignKey: 'id_Paciente' });

// Internacion 1:N Admisión
Internacion.hasMany(Admision, { foreignKey: 'id_Internacion' });
Admision.belongsTo(Internacion, { foreignKey: 'id_Internacion' });

// Paciente 1:N Admisión
Paciente.hasMany(Admision, { foreignKey: 'id_Paciente' });
Admision.belongsTo(Paciente, { foreignKey: 'id_Paciente' });

// Admisión 1:N EvaluacionEnfermeria
Admision.hasMany(EvaluacionEnfermeria, { foreignKey: 'id_Admision' });
EvaluacionEnfermeria.belongsTo(Admision, { foreignKey: 'id_Admision' });

// Enfermero/a 1:N EvaluacionEnfermeria
Enfermero.hasMany(EvaluacionEnfermeria, { foreignKey: 'id_Enfermero' });
EvaluacionEnfermeria.belongsTo(Enfermero, { foreignKey: 'id_Enfermero' });

// Habitacion 1:N Internacion
Habitacion.hasMany(Internacion, { foreignKey: 'id_Habitacion' });
Internacion.belongsTo(Habitacion, { foreignKey: 'id_Habitacion' });

// Habitacion 1:N Cama
Habitacion.hasMany(Cama, { foreignKey: 'id_Habitacion' });
Cama.belongsTo(Habitacion, { foreignKey: 'id_Habitacion' });


const sequelize = require("./db")

require("../models/AdmisionModels");
require("../models/CamaModels");
require("../models/EnfermeroModels");
require("../models/EvaluacionEnfermeriaModels");
require("../models/HabitacionModels");
require("../models/HistorialMedicoModels");
require("../models/InternacionModels");
require("../models/MedicoModels");
require("../models/PacienteModels");
require("../models/ParteMedicoModels");
require("../models/ContactoEmergenciaModels");
require("../models/CuidadosPacienteModels");
require("../models/DiagnosticoModels");
require("../models/EspecializacionModels");
require("../models/MotivoInternacionModels");
require("../models/ObraSocialModels");
require("../models/TipoAdmisionModels");
require("../models/TratamientoModels");
require("../models/AlaModels");
require("../models/AsignacionCamaModels");



(async () => {
    try {
      console.log("Conectando a la base de datos...");
      await sequelize.sync({ force: false }); //force, borra todos los datos de la bd y los vuelve a crear
      console.log("¡Las tablas fueron creadas con éxito!");
    } catch (error) {
      console.error("Error en la base de datos:", error);
    }
  })();
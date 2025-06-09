const sequelize = require("../config/db");

const TipoAdmision = require("../models/TipoAdmisionModels");
const ObraSocial = require("../models/ObraSocialModels");
const MotivoInternacion = require("../models/MotivoInternacionModels");
const Ala = require("../models/AlaModels");
const Habitacion = require("../models/HabitacionModels");
const Cama = require("../models/CamaModels");
const Paciente = require("../models/PacienteModels");

async function seed() {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    // TipoAdmision
    await TipoAdmision.bulkCreate([
      { nombre: "Emergencia" },
      { nombre: "Urgencia" },
      { nombre: "Consulta programada" },
      { nombre: "Derivacion" },
    ]);

    // ObraSocial
    await ObraSocial.bulkCreate([
      { nombre: "DOSEP" },
      { nombre: "OSDE" },
      { nombre: "PAMI" },
      { nombre: "DOSPU" },
      { nombre: "MEDIFE" },
    ]);

    // Paciente
    await Paciente.bulkCreate([
      
      {
        id_obra_social: 1,
        nombre: "Sofía",
        apellido: "Martínez",
        dni: "11223344",
        telefono: "1144556677",
        fecha_nacimiento: "1992-08-15",
        direccion: "Av. Illia 500",
        sexo: "Femenino",
        altura: 165,
        peso: 60,
        estado: true,
        pacientenn: false,
      },
      {
        id_obra_social: 2,
        nombre: "Lucas",
        apellido: "Fernández",
        dni: "22334455",
        telefono: "1133221100",
        fecha_nacimiento: "1988-03-10",
        direccion: "Calle España 245",
        sexo: "Masculino",
        altura: 178,
        peso: 75,
        estado: true,
        pacientenn: false,
      },
      {
        id_obra_social: 3,
        nombre: "Valentina",
        apellido: "López",
        dni: "33445566",
        telefono: "1177889900",
        fecha_nacimiento: "1995-12-20",
        direccion: "B° Jardín 123",
        sexo: "Femenino",
        altura: 170,
        peso: 65,
        estado: true,
        pacientenn: false,
      },
      {
        id_obra_social: 4,
        nombre: "Martín",
        apellido: "González",
        dni: "44556677",
        telefono: "1155667788",
        fecha_nacimiento: "1975-07-04",
        direccion: "Calle Mitre 456",
        sexo: "Masculino",
        altura: 180,
        peso: 85,
        estado: true,
        pacientenn: false,
      },
      {
        id_obra_social: 5,
        nombre: "Camila",
        apellido: "Rojas",
        dni: "55667788",
        telefono: "1166778899",
        fecha_nacimiento: "2000-01-30",
        direccion: "Av. Perón 789",
        sexo: "Femenino",
        altura: 160,
        peso: 55,
        estado: true,
        pacientenn: false,
      },
      {
        id_obra_social: null,
        nombre: "Ignacio",
        apellido: "Pérez",
        dni: "66778899",
        telefono: "1199887766",
        fecha_nacimiento: "1999-09-09",
        direccion: "Mi casa",
        sexo: "Masculino",
        altura: 175,
        peso: 70,
        estado: true,
        pacientenn: false,
      },
    ]);

    // MotivoInternacion
    await MotivoInternacion.bulkCreate([
      { nombre_motivo: "Cirugía" },
      { nombre_motivo: "Neumonía" },
      { nombre_motivo: "Infarto agudo de miocardio" },
      { nombre_motivo: "Apendicitis" },
      { nombre_motivo: "Fractura de fémur" },
      { nombre_motivo: "Accidente cerebrovascular" },
      { nombre_motivo: "Insuficiencia renal" },
      { nombre_motivo: "Diabetes descompensada" },
      { nombre_motivo: "COVID-19" },
      { nombre_motivo: "Asma severa" },
      { nombre_motivo: "Cirugía programada" },
      { nombre_motivo: "Hemorragia digestiva" },
      { nombre_motivo: "Infección urinaria" },
      { nombre_motivo: "Pancreatitis" },
      { nombre_motivo: "Embolia pulmonar" },
      { nombre_motivo: "Traumatismo craneoencefálico" },
      { nombre_motivo: "Hipertensión descompensada" },
      { nombre_motivo: "Reacción alérgica grave" },
      { nombre_motivo: "Deshidratación severa" },
    ]);

    // Ala
    await Ala.bulkCreate([
      { nombre_ala: "Cuidados Intermedios" },
      { nombre_ala: "Rehabilitacion" },
      { nombre_ala: "Terapia Intensiva" },
      { nombre_ala: "Unidad de Emergencias" },
    ]);

    // Habitacion
    const habitaciones = [];
    for (let ala = 1; ala <= 4; ala++) {
      for (let i = 1; i <= 10; i++) {
        habitaciones.push({
          id_ala: ala,
          nro_habitacion: ala * 100 + i,
          estado: true, 
        });
      }
    }
    await Habitacion.bulkCreate(habitaciones);

    // Cama
    const camas = [];
    for (let habitacionId = 1; habitacionId <= 40; habitacionId++) {
      camas.push(
        {
          id_habitacion: habitacionId,
          numero_cama: 1,
          estado: true,
          higiene: true,
        },
        {
          id_habitacion: habitacionId,
          numero_cama: 2,
          estado: true,
          higiene: true,
        }
      );
    }
    await Cama.bulkCreate(camas);

    console.log("Todos los datos iniciales insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos iniciales:", error);
  } finally {
    await sequelize.close();
    process.exit();
  }
}

seed();

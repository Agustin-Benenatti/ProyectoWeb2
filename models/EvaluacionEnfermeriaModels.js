const {Model, DataTypes} =  require("sequelize");
const sequelize = require("../config/db")
const Enfermero = require("./EnfermeroModels");
const CuidadoPaciente = require("./CuidadosPacienteModels");
const Internacion = require("./InternacionModels");

class EvaluacionEnfermeria extends Model {};

EvaluacionEnfermeria.init ( 
    {
        id_evaluacion_enfermeria: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_enfermero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Enfermero,
                key: "id_enfermero",
            },
            onDelete: "CASCADE",
        },
        id_internacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Internacion,
                key: "id_internacion",
            },
            onDelete: "CASCADE",
        },
        id_cuidado_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: CuidadoPaciente,
                key: "id_cuidado_paciente",
            },
            onDelete: "CASCADE",
        },
        sintomas: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        presion_arterial: {
            type: DataTypes.STRING,
            allowNull: true,
        
        },
        frecuencia_cardiaca: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        frecuencia_respiratoria: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        temperatura: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        plan_cuidados: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        observaciones: {
            type: DataTypes.STRING,
            allowNull: false,
        },
       
    },
    {
        sequelize,
        modelName: "EvaluacionEnfermeria",
        tableName: "evaluacion_enfermeria",
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = EvaluacionEnfermeria;
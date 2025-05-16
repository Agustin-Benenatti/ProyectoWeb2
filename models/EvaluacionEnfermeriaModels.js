const {Model, DataTypes} =  require("sequelize");
const sequelize = require("../config/db")
const Enfermero = require("./EnfermeroModels");
const Admision = require ("./AdmisionModels");
const CuidadoPaciente = require("./CuidadosPacienteModels");

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
        id_admision: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Admision,
                key: "id_admision",
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
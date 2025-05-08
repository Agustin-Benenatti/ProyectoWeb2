const {Model, DataTypes} =  require("sequelize");
const sequelize = require("../config/db")
const Enfermero = require("./EnfermeroModels");
const Admision = require ("./AdmisionModels");

class EvaluacionEnfermeria extends Model {};

EvaluacionEnfermeria.init ( 
    {
        id_Evaluacion_Enfermeria: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_Enfermero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Enfermero,
                key: "id_Enfermero",
            },
            onDelete: "CASCADE",
        },
        id_Admision: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Admision,
                key: "id_Admision",
            },
            onDelete: "CASCADE",
        },
        Observaciones: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Cuidados_Paciente: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        sequelize,
        modelName: "EvaluacionEnfermeria",
        timestamps: false,
    }
)
module.exports = EvaluacionEnfermeria;
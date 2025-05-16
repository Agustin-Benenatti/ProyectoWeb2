const {Model, DataType, DataTypes} = require("sequelize");
const sequelize = require("../config/db");
const Paciente = require("./PacienteModels");
const Medico = require("./MedicoModels");

class HistorialMedico extends Model {};

HistorialMedico.init (
    {
        id_historialMedico: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_medico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Medico,
                key: "id_medico",
            },
            onDelete: "CASCADE",
        },
        id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Paciente,
                key: "id_paciente",
            },
            onDelete: "CASCADE",
        },
        
    },
    {
        sequelize,
        modelName: "Historial_Medico",
        tableName: "historial_medico",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = HistorialMedico;
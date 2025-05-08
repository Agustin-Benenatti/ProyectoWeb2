const {Model, DataType, DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const Paciente = require("./PacienteModels")


class HistorialMedico extends Model {};

HistorialMedico.init (
    {
        id_HistorialMedico: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_Paciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: Paciente,
                key: "id_Paciente",
            },
            onDelete: "CASCADE",
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Diagnostico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Tratamiento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Medico_Responsable: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        sequelize,
        modelName: "Historial_Medico",
        timestamps: false,
    }
)

module.exports = HistorialMedico;
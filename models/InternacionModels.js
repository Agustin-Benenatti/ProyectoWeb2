const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const Paciente = require("./PacienteModels");
const Habitacion = require("./HabitacionModels");

class Internacion extends Model {};

Internacion.init (
    {
        id_Internacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_Habitacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Habitacion,
                key: "id_Habitacion",
            },
            onDelete: "CASCADE",
        },
        id_Paciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Paciente,
                key: "id_Paciente",
            },
            onDelete: "CASCADE",
        },
        Fecha_Ingreso: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        Fecha_Salida: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Diagnostico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Internacion",
        timestamps: false,
    }
)

module.exports = Internacion;
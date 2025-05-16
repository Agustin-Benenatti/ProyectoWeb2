const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const Paciente = require("./PacienteModels");
const Habitacion = require("./HabitacionModels");
const MotivoInternacion = require("./MotivoInternacionModels");

class Internacion extends Model {};

Internacion.init (
    {
        id_internacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_habitacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Habitacion,
                key: "id_habitacion",
            },
            onDelete: "CASCADE",
        },
        id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Paciente,
                key: "id_paciente",
            },
            onDelete: "CASCADE",
        },
        id_motivo_internacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: MotivoInternacion,
                key:"id_motivo_internacion",
            },
            onDelete: "CASCADE",
        },
        fecha_ingreso: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        fecha_salida: {
            type: DataTypes.DATE,
            allowNull: true,
        },
       
    },
    {
        sequelize,
        modelName: "Internacion",
        tableName: "internacion",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Internacion;
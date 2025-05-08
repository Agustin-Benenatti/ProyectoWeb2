const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const Paciente = require("./PacienteModels");
const Internacion = require('./InternacionModels');


class Admision extends Model {};

Admision.init (
    {
        id_Admision: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        id_Internacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Internacion,
                key: "id_Internacion",
            },
            onDelete: "CASCADE",
        },
        Fecha_Admision: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Motivo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Tipo_Admision: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Admision",
        timestamps: false,
    }
)
module.exports = Admision;
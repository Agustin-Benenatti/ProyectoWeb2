const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const Internacion = require("./InternacionModels");
const Medico = require("./MedicoModels");
const Tratamiento = require("./TratamientoModels");
const Diagnostico = require("./DiagnosticoModels");

class ParteMedico extends Model {};

ParteMedico.init (
    {
        id_parte_medico: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        id_medico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Medico,
                key: "id_medico",
            },
            onDelete: "CASCADE",
        },
        id_diagnostico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Diagnostico,
                key: "id_diagnostico",
            },
            onDelete: "CASCADE",
        },
        id_tratamiento:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Tratamiento,
                key: "id_tratamiento",
            },
            onDelete: "CASCADE",
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
      
    },
    {
        sequelize,
        modelName: "Parte_Medico",
        tableName: "parte_medico",
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = ParteMedico;
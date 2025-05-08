const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const Internacion = require("./InternacionModels");
const Medico = require("./MedicoModels");

class ParteMedico extends Model {};

ParteMedico.init (
    {
        id_ParteMedico: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        id_Medico: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Medico,
                key: "id_Medico",
            },
            onDelete: "CASCADE",
        },
        Fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    },
    {
        sequelize,
        modelName: 'Parte_Medico',
        timestamps: false,
    }
)
module.exports = ParteMedico;
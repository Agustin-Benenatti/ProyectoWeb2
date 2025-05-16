const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db");
const Especializacion = require("./EspecializacionModels")



class Medico extends Model {};

Medico.init (
    {
        id_medico: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_especializacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Especializacion,
                key: "id_especializacion",
            },
            onDelete: "CASCADE",
        },
        nro_matricula:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
     
        estado: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },

    },
    {
        sequelize,
        modelName: "Medico",
        tableName: "medico",
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = Medico;
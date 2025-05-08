const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db")



class Medico extends Model {};

Medico.init (
    {
        id_Medico: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nro_Matricula:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Especializacion: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        sequelize,
        modelName: "Medico",
        timestamps: false,
    }
)
module.exports = Medico;
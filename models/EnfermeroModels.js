const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db")


class Enfermero extends Model {};

Enfermero.init (
    {
        id_Enfermero: {
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
        }
    },
    {
        sequelize,
        modelName: "Enfermero",
        timestamps: false,
    }
)
module.exports = Enfermero;
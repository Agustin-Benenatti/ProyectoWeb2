const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db")



class Habitacion extends Model {};

Habitacion.init (
    {
        id_Habitacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sexo_Habitacion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        Ala: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "Habitacion",
        timestamps: false,
    }
)
module.exports = Habitacion;
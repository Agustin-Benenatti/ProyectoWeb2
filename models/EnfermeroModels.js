const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db")


class Enfermero extends Model {};

Enfermero.init (
    {
        id_enfermero: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: "Enfermero",
        tableName: "enfermero",
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = Enfermero;
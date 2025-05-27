const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db");
const Ala = require("./AlaModels");



class Habitacion extends Model {};

Habitacion.init (
    {
        id_habitacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, 
        id_ala:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Ala,
                key: "id_ala",
            },
            onDelete: "CASCADE",
        },
        nro_habitacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },       
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Habitacion",
        tableName: "habitacion",
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = Habitacion;
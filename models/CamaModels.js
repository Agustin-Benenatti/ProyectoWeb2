const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const Habitacion = require("./HabitacionModels");


class Cama extends Model {};

Cama.init (
    {
        id_cama: {
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
        numero_cama: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        higiene: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: "Cama",
        tableName: "cama",
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = Cama;
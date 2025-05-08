const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const Habitacion = require("./HabitacionModels");


class Cama extends Model {};

Cama.init (
    {
        id_Cama: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_Habitacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Habitacion,
                key: "id_Habitacion",
            },
            onDelete: "CASCADE",
        },
        Estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Cama",
        timestamps: false,
    }
)
module.exports = Cama;
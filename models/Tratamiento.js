const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class Tratamiento extends Model {}

Tratamiento.init(
    {
        id_tratamiento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "Tratamiento",
        tableName: "tratamiento",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Tratamiento;
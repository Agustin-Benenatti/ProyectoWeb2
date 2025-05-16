const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class Diagnostico extends Model {}

Diagnostico.init(
    {
        id_diagnostico: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Diagnostico",
        tableName: "diagnostico",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Diagnostico;
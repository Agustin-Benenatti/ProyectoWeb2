const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class Especializacion extends Model {}

Especializacion.init(
    {
        id_especializacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre_especializacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Especializacion",
        tableName: "especializacion",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Especializacion;
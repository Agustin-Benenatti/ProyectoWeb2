const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class ObraSocial extends Model {}

ObraSocial.init(
    {
        id_obra_social: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "ObraSocial",
        tableName: "obra_social",
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = ObraSocial;
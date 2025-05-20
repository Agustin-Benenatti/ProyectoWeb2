const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");



class Ala extends Model {}

Ala.init(
    {
        id_ala: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre_ala: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Ala",
        tableName: "ala",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Ala;
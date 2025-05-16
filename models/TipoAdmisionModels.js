const {Model, DataTypes}= require("sequelize");
const sequelize = require("../config/db");


class TipoAdmision extends Model {}

TipoAdmision.init (
    {
        id_tipo_admision: {
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
        modelName: "TipoAdmision",
        tableName: "tipo_admision",
        freezeTableName: true,
        timestamps: false,
    }
    
);

module.exports = TipoAdmision;
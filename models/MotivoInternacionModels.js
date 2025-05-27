const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class MotivoInternacion extends Model {}

MotivoInternacion.init(
    {
        id_motivo_internacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre_motivo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "MotivoInternacion",
        tableName: "motivo_internacion",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = MotivoInternacion;
const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db");
const Internacion = require("./InternacionModels");
const Cama = require("./CamaModels");


class AsignacionCama extends Model {}

AsignacionCama.init (
    {
        id_asignacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_internacion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Internacion,
                key: "id_internacion"
            },
            onDelete: "CASCADE"
        },
        id_cama: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cama,
                key: "id_cama",
            },
            onDelete: "CASCADE"

        },

    },
    {
        sequelize,
        modelName: "AsignacionCama",
        tableName: "asignacion_cama",
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = AsignacionCama;
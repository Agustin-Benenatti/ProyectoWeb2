const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const Paciente = require("./PacienteModels");
const TipoAdmision = require("./TipoAdmisionModels");


class Admision extends Model {};

Admision.init (
    {
        id_admision: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_paciente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Paciente,
                key: "id_paciente",
            },
            onDelete: "CASCADE",
        },
      
        id_tipo_admision: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: TipoAdmision,
                key: "id_tipo_admision"
            }

        },
        fecha_admision: {
            type: DataTypes.DATE,
            allowNull: false,
        },
           estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,

        },
       
    },
    {
        sequelize,
        modelName: "Admision",
        tableName: "admision",
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = Admision;
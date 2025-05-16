const {Model,DataTypes} = require("sequelize");
const sequelize = require("../config/db");
const Paciente = require("./PacienteModels")


class ContactoEmergencia extends Model {}

ContactoEmergencia.init(
    {
        id_contacto: {
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
        nombre_contacto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relacion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName:"ContactoEmergencia",
        tableName:"contacto_emergencia",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = ContactoEmergencia;
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");


class CuidadoPaciente extends Model{}

CuidadoPaciente.init(
    {
        id_cuidado_paciente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "CuidadoPaciente",
        tableName: "cuidado_paciente",
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = CuidadoPaciente;
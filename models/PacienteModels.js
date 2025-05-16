const {Model , DataTypes} = require("sequelize");
const sequelize = require("../config/db")
const ObraSocial = require("./ObraSocialModels")



class Paciente extends Model {}

Paciente.init(
    {
        id_paciente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_obra_social: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ObraSocial,
                key: "id_obra_social",
            },
            onDelete: "CASCADE",
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        dni: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        peso: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        altura: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
       
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
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
        modelName: "Paciente",
        tableName: "paciente",
        freezeTableName: true,
        timestamps: false,
    }
)
module.exports = Paciente;
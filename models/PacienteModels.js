const {Model , DataTypes} = require("sequelize");
const sequelize = require("../config/db")



class Paciente extends Model {}

Paciente.init(
    {
        id_Paciente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Sexo: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        Edad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DNI: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        Peso: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        Altura: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        Obra_Social: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        Fecha_Nacimiento: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Contacto_Emergencia: {
            type: DataTypes.STRING,
            allowNull:false,
        }



    },
    {
        sequelize,
        modelName: "Paciente",
        timestamps: false,
    }
)
module.exports = Paciente;
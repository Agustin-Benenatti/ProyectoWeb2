const {Sequelize} = require("sequelize");
const credenciales = require("./credenciales");

const sequelize = new Sequelize(
    credenciales.database,
    credenciales.username,
    credenciales.password,
    {
        host: credenciales.host,
        dialect: credenciales.dialect,
        port: credenciales.port,
    }
);

module.exports = sequelize;
const { Sequelize } = require("sequelize");
const { development } = require("./config/config");

const sequelize = new Sequelize(development.database, development.username, development.password, {
    host: development.host,
    port: development.port,
    dialect: development.dialect,
});

sequelize
    .authenticate()
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

module.exports = sequelize;
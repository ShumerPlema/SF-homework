const { Sequelize } = require("sequelize");
const { test } = require("./config/config");

const sequelize = new Sequelize(test.database, test.username, test.password, {
    host: test.host,
    port: test.port,
    dialect: test.dialect,
});

sequelize
    .authenticate()
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

module.exports = sequelize;
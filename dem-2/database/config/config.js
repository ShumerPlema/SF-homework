const {resolve} = require("path")
const dotEnv = require("dotenv");
dotEnv.config({path: resolve(__dirname,"../../.env")});

module.exports = {
    development: {
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    },
    test: {
        username: process.env.DB_TEST_USER_NAME,
        password: process.env.DB_TEST_PASSWORD,
        database: process.env.DB_TEST_NAME,
        host: process.env.DB_TEST_HOST,
        port: process.env.DB_TEST_PORT,
        dialect: process.env.DB_TEST_DIALECT,
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql"
    }
}
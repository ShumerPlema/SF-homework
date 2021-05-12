const {DataTypes, Model} = require("sequelize");
const sequelize = require("../db");

class Manufacture extends Model {
}

const ManufactureModel = Manufacture.init({
    id_manufacture: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    manufacture: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {sequelize})

module.exports = {ManufactureModel};
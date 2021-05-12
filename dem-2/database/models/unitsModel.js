const {DataTypes, Model} = require("sequelize");
const sequelize = require("../db");

class Unit extends Model {
}

const UnitModel = Unit.init({
    id_unit: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {sequelize})

module.exports = {UnitModel};
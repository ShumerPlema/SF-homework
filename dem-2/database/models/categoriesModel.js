const {DataTypes, Model} = require("sequelize");
const sequelize = require("../db");

class Category extends Model {
}

const CategoryModel = Category.init({
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {sequelize})

module.exports = {CategoryModel};
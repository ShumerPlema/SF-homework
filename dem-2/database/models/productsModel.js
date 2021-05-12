const {DataTypes, Model} = require("sequelize");
const sequelize = require("../db");
const {CategoryModel} = require("../models/categoriesModel");
const {ManufactureModel} = require("../models/manufacturesModel");
const {UnitModel} = require("../models/unitsModel");

class Product extends Model {
}

const ProductModel = Product.init({
    product: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_manufacture: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ingridients: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    img_link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    }
}, {sequelize})

CategoryModel.hasMany(ProductModel, {
    foreignKey: "id_category"
})
ProductModel.belongsTo(CategoryModel, {
    foreignKey: "id_category"
})


ManufactureModel.hasMany(ProductModel, {
    foreignKey: "id_manufacture"
})
ProductModel.belongsTo(ManufactureModel, {
    foreignKey: "id_manufacture"
})

UnitModel.hasMany(ProductModel, {
    foreignKey: "id_unit"
})
ProductModel.belongsTo(UnitModel, {
    foreignKey: "id_unit"
})

module.exports = {ProductModel};
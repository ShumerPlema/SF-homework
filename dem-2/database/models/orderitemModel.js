const {DataTypes, Model} = require("sequelize");
const sequelize = require("../db");
const {ProductModel} = require("./productsModel");
const {OrderModel} = require("./ordersModel");

class Orderitem extends Model {
}

const OrderitemModel = Orderitem.init({
    id_orderitem: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {sequelize})

OrderitemModel.hasMany(ProductModel, {
    foreignKey: "id_product"
});
ProductModel.belongsTo(OrderitemModel, {
    foreignKey: "id_product"
})


OrderitemModel.hasMany(OrderModel, {
    foreignKey: "id_order"
})
OrderModel.belongsTo(OrderitemModel, {
    foreignKey: "id_order"
})


module.exports = {OrderitemModel};
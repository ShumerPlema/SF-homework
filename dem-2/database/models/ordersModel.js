const {DataTypes, Model} = require("sequelize");
const sequelize = require("../db");
const {Sequelize} = require("sequelize");
const {UserModel} = require("./usersModel");

class Order extends Model {
}

const OrderModel = Order.init({
    id_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    }
}, {sequelize})


OrderModel.hasMany(UserModel, {
    foreignKey: "id_user"
})
UserModel.belongsTo(OrderModel, {
    foreignKey: "id_user"
})



module.exports = {OrderModel};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Orders", {
      id_order: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id_user"
        }
      },
      order_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Products", {
      id_product: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      id_manufacture: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Manufactures",
          key: "id_manufacture"
        }
      },
      id_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id_category"
        }
      },
      ingiridents: {
        type: Sequelize.STRING(2000),
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_unit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Units",
          key: "id_unit"
        }
      },
      price: {
        type: Sequelize.REAL,
        allowNull: false,
      },
      img_link: {
        type: Sequelize.STRING(400),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      UpdatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products");
  }
};

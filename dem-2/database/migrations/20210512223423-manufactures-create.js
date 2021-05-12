'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("Manufactures", {
            id_manufacture: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            manufacture: {
                type: Sequelize.STRING(50),
                allowNull: false,
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
        return queryInterface.dropTable('Manufactures')
    }
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
     
      answer_a: {
        type: Sequelize.STRING
      },
      answer_b: {
        type: Sequelize.STRING
      },
      answer_c: {
        type: Sequelize.STRING
      },
      answer_d: {
        type: Sequelize.STRING
      },
      key_answer: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Questions');
  }
};
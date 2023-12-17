'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fakeQuestions = [];
    
    for (let i = 0; i < 20000; i++) {
      fakeQuestions.push({
        question: faker.lorem.sentence(),
        answer_a: faker.lorem.word(),
        answer_b: faker.lorem.word(),
        answer_c: faker.lorem.word(),
        answer_d: faker.lorem.word(),
        key_answer: faker.helpers.arrayElement(['a', 'b', 'c', 'd']),
        level: faker.helpers.arrayElement(['easy', 'medium', 'hard']),
        category: faker.helpers.arrayElement(['PPS', 'ITI', 'MOSI','MDIK']),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Questions', fakeQuestions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};

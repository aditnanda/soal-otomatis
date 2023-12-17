'use strict';
const db = require('../models/index');
const User = require('../models').User
const bcrypt = require('bcryptjs');
const Role = require('../models').Role
const Op = db.Sequelize.Op


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
    await queryInterface.bulkInsert('Roles', [{
      name: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'USER',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const user = await User.create({
      name: 'Aditya Nanda',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('12345678', 8)
    });

    console.log(user.id);

    // Find roles with name 'ADMIN'
    const roles = await Role.findAll({
      where: {
        name: {
          [Op.or]: ['ADMIN']
        }
      }
    });

    console.log(roles);

    // Set roles for the user
    await user.setRoles(roles);

    console.log('User successfully assigned roles');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_role = sequelize.define('user_role', {

    role_id: DataTypes.STRING,
    user_id: DataTypes.STRING
  }, {});
  user_role.associate = function(models) {
    // associations can be defined here
    user_role.belongsTo(models.User, {
      foreignKey: 'id',
      as: 'user'
    });

    user_role.belongsTo(models.Role, {
      foreignKey: 'id',
      as: 'role'
    });

  };
  return user_role;
};
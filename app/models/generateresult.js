'use strict';
module.exports = (sequelize, DataTypes) => {
  const GenerateResult = sequelize.define('GenerateResult', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    easy: DataTypes.INTEGER,
    medium: DataTypes.INTEGER,
    hard: DataTypes.INTEGER,
    category: DataTypes.STRING,
    questions: DataTypes.JSON,
    count: DataTypes.INTEGER
  }, {});
  GenerateResult.associate = function(models) {
    // associations can be defined here
    // GenerateResult.belongsTo(models.User, {
    //   foreignKey: 'user_id',
    //   as: 'user'
    // });
  };
  return GenerateResult;
};
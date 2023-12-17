'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    question: DataTypes.STRING,
    answer_a: DataTypes.STRING,
    answer_b: DataTypes.STRING,
    answer_c: DataTypes.STRING,
    answer_d: DataTypes.STRING,
    key_answer: DataTypes.STRING,
    level: DataTypes.STRING,
    category: DataTypes.STRING
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    // Question.belongsTo(models.User, {
    //   foreignKey: 'user_id',
    //   as: 'user'
    // });
  };
  return Question;
};
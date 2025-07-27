'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    static associate(models) {
      // 👇 One State has many Cities
      State.hasMany(models.City, {
        foreignKey: 'stateId',
        as: 'cities', // optional alias
        onDelete: 'CASCADE' // optional: deletes cities if state is deleted
      });
    }
  }

  State.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'State',
  });

  return State;
};

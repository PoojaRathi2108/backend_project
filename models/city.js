'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      // 👇 Each City belongs to one State
      City.belongsTo(models.State, {
        foreignKey: 'stateId',
        as: 'state',
        onDelete: 'CASCADE' // optional
      });
    }
  }

  City.init({
    name: DataTypes.STRING,
    stateId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'City',
  });

  return City;
};

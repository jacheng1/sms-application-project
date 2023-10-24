'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TextMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TextMessage.init({
    message: DataTypes.STRING,
    dataSent: DataTypes.STRING,
    customerId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'TextMessage',
  });
  return TextMessage;
};
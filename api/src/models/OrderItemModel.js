const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('orderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};

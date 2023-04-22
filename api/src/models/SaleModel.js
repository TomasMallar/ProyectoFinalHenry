const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    paymentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    }
    // Agregar más campos según sea necesario, por ejemplo, campos relacionados con MercadoPago.
  });
};

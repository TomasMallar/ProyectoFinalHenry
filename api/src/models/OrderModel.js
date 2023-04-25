const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      allowNull: false,
    },
    // shipping_address: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // billing_address: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // Aca podriamos agregar un campo para guardar datos de envio por ejemplo
  });
};
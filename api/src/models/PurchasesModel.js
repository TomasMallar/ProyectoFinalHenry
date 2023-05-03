const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'purchase',
        {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
  },
  { timestamps: true }
)
}

const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'cart',
        {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false,
      defaultValue: [],
    },
  },
  { timestamps: true }
)
}

const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'product',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true
                }
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                }
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true,
                }
            },
            score: {
                type: DataTypes.JSON,
                
            },
            totalSold: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: false,
              },
        },
        {
            paranoid: true,
            timestamps: true,
        }
    )
}

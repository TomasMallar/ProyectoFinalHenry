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
            ingredients: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isUrl: true,
                }
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    max: 5,
                    min: 0
                }
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false,
        }
    )
}

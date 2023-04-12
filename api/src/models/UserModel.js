const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,               
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^[a-zA-Z]+$/
                }
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    is: /^[a-zA-Z]+$/
                }
            },
            mail: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                }
            },
            date_of_birth: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isDate: true
                }
            },
            favorites: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true
                }
            },  
            favorites_tastes: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false
            }
        },
        {
            timestamps: false,
        }
    )
}
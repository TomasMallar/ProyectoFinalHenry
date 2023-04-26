const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'coment',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }
    )
}
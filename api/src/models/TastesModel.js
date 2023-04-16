const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'taste',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            timestamps: false,
            paranoid: true,
        }
    )
}
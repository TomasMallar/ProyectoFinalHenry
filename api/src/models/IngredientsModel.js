const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'ingredient',
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
        },
        {
            paranoid: true,
            timestamps: true,
        }
    )
}

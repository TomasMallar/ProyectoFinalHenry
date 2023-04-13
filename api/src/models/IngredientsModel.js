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
            ingredient: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        },
        {
            timestamps: false,
        }
    )
}

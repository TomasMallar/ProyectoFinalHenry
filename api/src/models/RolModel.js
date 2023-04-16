const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'rol',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            rol_name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            }
        },
        {
            paranoid: true,
            timestamps: true,
        }
    )
}
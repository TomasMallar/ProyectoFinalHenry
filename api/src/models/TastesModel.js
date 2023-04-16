
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
            paranoid: true,
            timestamps: true,
        }
    )
}
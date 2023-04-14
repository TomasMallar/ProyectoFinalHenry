const {Op} = require('sequelize')
const { Type } = require("../../db");

const postType = async(name) => {
    console.log(name)
    const [newType] = await Type.findOrCreate({
        where: {name: { [Op.iLike]: `%${name}%` }}
    })
    console.log(typeof newType)
    return newType
}

module.exports = {
    postType,
}
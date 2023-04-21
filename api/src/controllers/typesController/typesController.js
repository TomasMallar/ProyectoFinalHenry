const {Op} = require('sequelize')
const { Type } = require("../../db");

const getTypesAll = async () => {
    const allTypes = await Type.findAll()
    const typesMaped = allTypes.map(type => type.name)
    return typesMaped
}

const getTypesWithID = async() => {
    const types = await Type.findAll()
    const typesMaped = types.map(type => {
        return {
            id: type.id,
            name: type.name
        }
    })
    return typesMaped
}

const postType = async(name) => {
    const [newType] = await Type.findOrCreate({
        where: {name}
    })
    return newType
}

module.exports = {
    postType,
    getTypesAll, 
    getTypesWithID
}
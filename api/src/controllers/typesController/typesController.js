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

const putTypes = async(id, name) => {
    const updateType = await Type.update({name: name},{
        where: {id: id}
    })

    if(updateType !== 0) return {message: "Updated successfully"}
    else return {message: "Error while updating"}
}

const deleteTypes = async(id) => {
    const typeDeleted = await Type.destroy({where: {id: id}})
    if (typeDeleted !== 0) return { message: "Successfully deleted" }
    else return { message: "Error while deleting" }
}

module.exports = {
    postType,
    getTypesAll, 
    getTypesWithID,
    deleteTypes,
    putTypes
}
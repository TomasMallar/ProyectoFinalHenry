const { Taste } = require("../../db");

const getAllTastes = async() => {
    const tastes = await Taste.findAll()
    const allTastes = tastes.map(taste => taste.name)
    return allTastes
}

const postNewTaste = async(name) => {
    const [newTaste] = await Taste.findOrCreate({
        where: {name: name}
    })

    return newTaste
}

const putTaste = async(id, name) => {
    const updateTaste = await Taste.update({name: name},{
        where: {id: id}
    })

    if(updateTaste !== 0) return {message: "Updated successfully"}
    else return {message: "Error while updating"}
}

const deleteTaste = async(id) => {
    const tasteDeleted = await Taste.destroy({where: {id: id}})
    if (tasteDeleted !== 0) return { message: "Successfully deleted" }
    else return { message: "Error while deleting" }
}

module.exports = {
    getAllTastes,
    postNewTaste,
    putTaste,
    deleteTaste
}
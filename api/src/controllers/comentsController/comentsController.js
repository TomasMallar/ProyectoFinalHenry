const { Coment, User, Product } = require("../../db")

const getComents = async(id, page) => {
    const size = 3
    let options = {
        limit: +size,
        offset: (+page) * (+size)
    }

    const { count, rows } = await Coment.findAndCountAll({
        where: {productId: id},
        ...options
    }
    )


    return rows
}

const postComent = async(userId, content, productId) => {
    const user = await User.findByPk(userId)
    const product = await Product.findByPk(productId)
    console.log(user.dataValues)
    const newComent = await Coment.create({
        name: user.dataValues.name + ' ' + user.dataValues.surname,
        content: content,
        userId: user.id,
        productId: product.id
    })
    return newComent
}

const putComent = async(userId, comentId, content) => {
    const updatedComent = await Coment.update({content: content}, {
        where: {
            id: comentId,
            userId: userId
        }
    })
    const findComment = await Coment.findAll({where: {
        id: comentId
    }})
    return findComment
}   

const deleteComent = async(userId, comentId) => {
    
    const deletedComent = await Coment.destroy({
        where: {
            id: comentId,
            userId: userId
        }
    })
    
    return deletedComent
}

module.exports = {
    getComents,
    postComent,
    putComent,
    deleteComent
}
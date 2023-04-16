const { Product, Category, Type, Ingredient, User } = require("../../db");

const getAllFavTypes = async (id) => {
  const usuario = await User.findOne({
    where: { id: id },
    include: [
      {
        model: Type,
        attributes: ['name'],
      }
    ]
  });

  const favoritesTypes = await usuario.getTypes();
  console.log(favoritesTypes);
  const typesId = favoritesTypes.map((tipo) => tipo.id);
  console.log(typesId);
  const products = await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
      {
        model: Type,
        attributes: ['name'],
        where: { id: typesId },
        through: {
          attributes: [],
        },
      },
      {
        model: Ingredient,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return products;
}

const postNewFavType = async (name, id) => {

  const user = await User.findOne({
    where: { id: id },
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }
  })
  const userFavTypes = user.types.map(t => t.name)

  if (userFavTypes.includes(name)) throw Error('The selected item is already in your favorites list')

  const getType = await Type.findAll({
    where: { name }
  })

  user.addType(getType)

  return { message: `The ${name} type was added successfully.` }
}

const deleteFavType = async (id, name) => {

  const user = await User.findOne({
    where: { id: id },
    include: {
      model: Type,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })
  const type = await Type.findOne({
    where: { name: name }
  })

  await user.removeType(type)

  const deleteVerification = user.types.map(t => t.name === name)
  
  if(deleteVerification.includes(true)) return {message: 'Successfully removed'}
  else throw Error('Failed to delete type')
}

module.exports = {
  getAllFavTypes,
  postNewFavType,
  deleteFavType
}
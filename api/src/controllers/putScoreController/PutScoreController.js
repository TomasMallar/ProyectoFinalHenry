const { Product } = require('../../db')

const updateScoreFromDB = async (score, id) => {
  try {
    const product = await Product.findByPk(Number(id));
    if (product) {
      let { cont, suma } = product.score;
      cont++;
      suma += score;
      const currentScore = suma / cont;
      const newScore = { currentScore, cont, suma };
      product.score = newScore;
      const result = await product.save();
      return result;
    }
  } catch (error) {
    return error.message;
  }
}

const getChocolateById = async(id)=> {
  const product = await Product.findByPk(id)
  return product.score
}

module.exports = {
  updateScoreFromDB, getChocolateById
};

  const cleanArrayProduct = (chocolate) => {
      return {
        id: chocolate.id,
        name: chocolate.name,
        price: chocolate.price,
        stock: chocolate.stock,
        image: chocolate.image,
        score: chocolate.score,
        categories: chocolate.categories.map((category)=>category.name),
        create: chocolate.create,
      };
    };
  
  module.exports = {cleanArrayProduct}
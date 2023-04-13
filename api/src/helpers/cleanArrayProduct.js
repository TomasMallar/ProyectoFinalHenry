
  const cleanArrayProduct = (chocolate) => {
      return {
        id: chocolate.id,
        name: chocolate.name,
        price: chocolate.price,
        stock: chocolate.stock,
        ingredients: chocolate.ingredients.map((ingredient)=>ingredient.name),
        image: chocolate.image,
        score: chocolate.score,
        types: chocolate.types.map((type)=>type.name),
        categories: chocolate.categories.map((category)=>category.name),
        create: chocolate.create,
      };
    };
  
  module.exports = {cleanArrayProduct}
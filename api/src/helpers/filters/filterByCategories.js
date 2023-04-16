const filterByCategory = (products, categories) => {

    let categoriesArray = categories;

    if (typeof categories === 'string') {
        categoriesArray = [categories];
    }

    const productsFilteredByCategory = products.filter(product => 
      categories.every(category => product.categories.includes(category))
    );
    
    return productsFilteredByCategory;

};
  
module.exports = filterByCategory;
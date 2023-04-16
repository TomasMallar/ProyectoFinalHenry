const filterByTypes = (products, types) => {

    let typesArray = types;

    if (typeof types === 'string') {
        typesArray = [types];
    }

    const productsFilteredByType = products.filter(product => 
        types.every(type => product.types.includes(type))
      );    

    return productsFilteredByType
}

module.exports = filterByTypes
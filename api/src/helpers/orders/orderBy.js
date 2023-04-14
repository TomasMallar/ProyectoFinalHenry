const compare = (direction) => (a, b) => {
    if (a < b) {
      return direction === 'ASC' ? -1 : 1;
    } else if (a > b) {
      return direction === 'ASC' ? 1 : -1;
    }
    return 0;
  };
  
  const sortByProperty = (products, property, direction) => {
    return products.sort((productA, productB) => {
      const aValue = productA[property];
      const bValue = productB[property];
  
      if (typeof aValue === 'string') {
        return compare(direction)(aValue.toLowerCase(), bValue.toLowerCase());
      }
      return compare(direction)(aValue, bValue);
    });
  };
  
  const sortProducts = (products, property, direction) => {
    if (['id', 'nombre', 'precio', 'score'].includes(property)) {
      return sortByProperty(products, property, direction);
    }
  
    return products;
  };
  
  module.exports = { sortProducts };
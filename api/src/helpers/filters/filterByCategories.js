const filterByCategory = (products, name) => {
    const productsFilteredByCategory = products.filter(product => product.categories.includes(name))
    return productsFilteredByCategory
}

module.exports = filterByCategory
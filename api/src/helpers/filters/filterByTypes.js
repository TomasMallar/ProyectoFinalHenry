
const filterByTypes = (products, name) => {
    const productsFilteredByType = products.filter(product => product.types.includes(name))
    return productsFilteredByType
}

module.exports = filterByTypes
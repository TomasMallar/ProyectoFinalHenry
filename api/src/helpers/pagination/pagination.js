const paginateProducts = (products, pageNumber, pageSize) => {
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / pageSize);
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber * pageSize;
  
    const paginatedProducts = products.slice(startIndex, endIndex);
  
    return {
      pageNumber,
      pageSize,
      totalPages,
      totalProducts,
      products: paginatedProducts,
    };
  };
  
  module.exports = { paginateProducts };
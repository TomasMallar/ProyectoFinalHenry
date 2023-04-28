const { Sale, Order, User, Product, OrderItem } = require('../../db');
const { Op } = require('sequelize');

async function getSalesReport(month = null, page = 1, pageSize = 100, year = 2023) {
  const options = {
    order: [['createdAt', 'DESC']],
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };

  let monthTotal = 0; // Inicializamos la variable monthTotal en 0
  let totalHistoric = 0;

  if (year === undefined) {
    year = new Date().getFullYear(); // si year no se ha proporcionado, utilizar el año actual
  }

  if (month) {
    options.where = {
      createdAt: {
        [Op.and]: [
          { [Op.gte]: new Date(2023, month - 1, 1) },
          { [Op.lte]: new Date(2023, month, 0, 23, 59, 59, 999) }
        ]
      }
    };
    console.log(options);
    // Obtenemos la suma total de la columna "amount" para el mes proporcionado
    const total = await Sale.sum('amount', {where: options.where} );
     totalHistoric = await Sale.sum('amount')
    monthTotal = parseFloat(total);
  }

//   const sales = await Sale.findAndCountAll(options);
const sales = await Sale.findAndCountAll({
    ...options,
    include: {
      model: Order,
      as: 'order',
      include: [
        {
          model: User,
          as: 'user'
        },
        {
          model: OrderItem,
          as: 'items',
          include: {
            model: Product,
            as: 'product'
          }
        }
      ]
    }
  });
  

  const report = {sales: []};

  sales.rows.forEach(sale => {
    report.sales.push(sale);
  });

  const totalPages = Math.ceil(sales.count / pageSize);

  if (month) {
    return { report: report.sales, monthTotal, page, pageSize, totalPages, totalHistoric };
  }

  return { report:report.sales, page, pageSize, totalPages };
}

module.exports = {getSalesReport};

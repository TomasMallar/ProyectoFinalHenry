const { Sale, Order, User, Product, OrderItem } = require('../../db');
const { Op } = require('sequelize');

async function getOrdersReport(year, month = null, page = 1, pageSize = 100) {
  const options = {
    order: [['createdAt', 'DESC']],
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };

  let monthTotal = 0; // Inicializamos la variable monthTotal en 0
  let totalHistoric = 0;

  if (year === null) {
    year = new Date().getFullYear(); // si year no se ha proporcionado, utilizar el año actual
    console.log(year);
  }

  if (month) {
    options.where = {
      createdAt: {
        [Op.and]: [
          { [Op.gte]: new Date(year, month - 1, 1) },
          { [Op.lte]: new Date(year, month, 0, 23, 59, 59, 999) }
        ]
      }
    };
    console.log(options);
    // Obtenemos la suma total de la columna "amount" para el mes proporcionado
  }

//   const sales = await Sale.findAndCountAll(options);
const sales = await Order.findAndCountAll({
    ...options,
    include: [
        {
            model: User,
            as: 'user',
        },
        {
            model: OrderItem,
            as: 'items',
            include: [
                {
                    model: Product,
                    as: 'product',
                },
            ],
        },
        {
            model: Sale,
            as: 'sale',
        },
    ],
});

  

  const report = {sales: []};

  sales.rows.forEach(sale => {
    report.sales.push(sale);
  });

  const totalPages = Math.ceil(sales.count / pageSize);

  return { report:report.sales, page, pageSize, totalPages };
}

module.exports = {getOrdersReport};

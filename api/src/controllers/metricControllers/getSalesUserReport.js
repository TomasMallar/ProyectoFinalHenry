const { Sale, Order, User, Product, OrderItem } = require('../../db');
const { Op } = require('sequelize');

async function getSalesUserReport(year, month = null, page = 1, pageSize = 100, userId) {
    const options = {
      order: [['createdAt', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: {
        model: Order,
        as: 'order',
        where: { userId: userId }, // condición para filtrar las órdenes del usuario
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
        ],
      },
      where: { '$order.userId$': userId }, // filtrar por el id del usuario en la orden
      distinct: true, // Agregar esta opción para asegurarse de que los registros sean únicos
    };
  
    let monthTotal = 0;
    let totalHistoric = 0;
  
    if (year === null) {
      year = new Date().getFullYear();
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
  
      const total = await Sale.sum('amount', { where: options.where });
      totalHistoric = await Sale.sum('amount');
      monthTotal = parseFloat(total);
    }
  
    const sales = await Sale.findAndCountAll(options);
  
    const report = { sales: [] };
  
    sales.rows.forEach(sale => {
      report.sales.push(sale);
    });
  
    const totalPages = Math.ceil(sales.count / pageSize);
  
    if (month) {
      return { report: report.sales, monthTotal, page, pageSize, totalPages, totalHistoric };
    }
  
    return { page, pageSize, totalPages, totalSales: sales.count,  report: report.sales };
  }
  
  module.exports = { getSalesUserReport };
  
const { Sale, conn: sequelize } = require('../../db');

const getAverageAmountSalesHandler = async (req, res, next) => {
  try {
    console.log('ESTE ES SEQ', sequelize);
    const result = await Sale.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('amount')), 'averageAmount'],
        [sequelize.fn('MAX', sequelize.col('amount')), 'maxAmount'],
        [sequelize.fn('MIN', sequelize.col('amount')), 'minAmount'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalSales']
      ],
      where: {
        status: 'approved',
      }
    });

    const { averageAmount, maxAmount, minAmount, totalSales } = result.dataValues;


    res.json([
      {        "sales": "Minima Historica",        "value": minAmount      },
      {        "sales": "Venta Promedio",        "value": Number(averageAmount).toFixed(2)      },
      {        "sales": "Mayor Historica",        "value": maxAmount      }
    ]);
    
  } catch (error) {
    next(error);
  }
};

module.exports = { getAverageAmountSalesHandler };

  

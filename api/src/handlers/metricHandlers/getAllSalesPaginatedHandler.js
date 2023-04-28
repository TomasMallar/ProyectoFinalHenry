const {getSalesReport} = require("../../controllers/metricControllers/getSalesReport");

const getAllSalesPaginatedHandler = async (req, res) => {
  try {
    const month = req.query.month ? parseInt(req.query.month) : null;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const report = await getSalesReport(month, page, pageSize);
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo el reporte de ventas' });
  }
};

module.exports = { getAllSalesPaginatedHandler };

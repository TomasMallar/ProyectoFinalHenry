const {getOrdersReport} = require("../../controllers/metricControllers/getOrdersReport");

const getAllOrdersPaginatedHandler = async (req, res) => {
  try {
    const year = req.query.year ? parseInt(req.query.year) : null;
    const month = req.query.month ? parseInt(req.query.month) : null;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const report = await getOrdersReport(year, month, page, pageSize);
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo el reporte de Ordenes' });
  }
};

module.exports = { getAllOrdersPaginatedHandler };

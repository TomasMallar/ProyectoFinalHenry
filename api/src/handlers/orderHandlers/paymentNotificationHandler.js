const { handlePaymentNotification } = require('../../controllers/orderControllers/handlePaymentNotification');

const paymentNotificationHandler = async (req, res) => {
  try {
    await handlePaymentNotification(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar la notificación' });
  }
};

module.exports = { paymentNotificationHandler };

const { createPaymentPreference } = require('../../controllers/orderControllers/createPaymentPreference');

const createPaymentPreferenceHandler = async (req, res) => {
  try {
    const { orderId } = req.body;
    const paymentPreferenceId = await createPaymentPreference(orderId);

    res.status(200).json({ id: paymentPreferenceId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la preferencia de pago' });
  }
};

module.exports = { createPaymentPreferenceHandler };

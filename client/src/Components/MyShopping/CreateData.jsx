export default function createData(name, surname,mail, orderId,date, state, items, saleId, paymentMethod, statusSale, id) {
    return {
      id,
      name: `${name} ${surname}`,
      mail,
      orderId,
      saleId,
      paymentMethod,
      statusSale,
      totalAmount:items.map(item => item.quantity * item.product?.price).reduce((a, b) => a + b, 0),
      date: date.slice(0,10),
      state,
      history: items.map(item => {

       return  {name: item.product?.name || "producto Eliminado",
        id: item.product?.id || "producto Eliminado",
        quantity: item.quantity,
        itemPrice: item.product?.price || "Producto Eliminado",
        totalPrice: (Number(item.quantity) * Number(item.product?.price)),
    }
      })
    };
  }
  
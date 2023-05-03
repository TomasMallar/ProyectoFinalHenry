

export default function createData(orderId, status, date, items, paymentMethod) {
    return {
      orderId,
      status,
      date: date?.slice(0,10),
      paymentMethod,
      amount:items?.map(item => item.quantity * item.product?.price).reduce((a, b) => a + b, 0),   
      history: items?.map(item => {
          return {
              itemId:item.product?.id, 
              quantity:item.quantity,
              price: item.product?.price, 
              totalAmount: item.quantity * item.product?.price }
      }),
    };
  }

  
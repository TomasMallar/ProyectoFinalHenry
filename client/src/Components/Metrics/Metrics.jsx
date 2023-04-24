import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Metric() {
  const [totalSalesOrders, setTotalSalesOrders] = useState([]);
  const [purchasedCarts, setPurchasedCarts] = useState([]);
  const [purchasedCartsByCardPayment, setPurchasedCartsByCardPayment] = useState([]);
  const [averageAmountSales, setAverageAmountSales] = useState([]);
  
  useEffect(() => {
    axios.get('/metric/total-sales-orders-by-month')
      .then(response => {
        setTotalSalesOrders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      
    axios.get('/metric/purchasedCarts')
      .then(response => {
        setPurchasedCarts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      
    axios.get('/metric/purchasedCartsByCardPayment')
      .then(response => {
        setPurchasedCartsByCardPayment(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      
    axios.get('/metric/average-amount-sales')
      .then(response => {
        setAverageAmountSales(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Métrica</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total de ventas y órdenes por mes</td>
            <td>{totalSalesOrders}</td>
          </tr>
          <tr>
            <td>Carritos comprados</td>
            <td>{purchasedCarts}</td>
          </tr>
          <tr>
            <td>Carritos comprados con pago por tarjeta</td>
            <td>{purchasedCartsByCardPayment}</td>
          </tr>
          <tr>
            <td>Promedio de monto de ventas</td>
            <td>{averageAmountSales}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Metric;

const pdf = require('html-pdf');
const axios = require('axios')

const PDFMetrics = async (req, res) => {

    const tabla1 = await axios.get('http://localhost:3001/metric/purchasedCartsByCardPayment');
    const dataTable1 = tabla1.data

    const table3 = await axios.get('http://localhost:3001/metric/average-amount-sales')
    const dataTable3 = table3.data

    const table4 = await axios.get('http://localhost:3001/metric/top-sold-product')
    const dataTable4 = table4.data

    const table5 = await axios.get('http://localhost:3001/metric/purchasedCarts')
    const dataTable5 = table5.data

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const fecha = `${day}/${month}/${year}`
    let html = `
      <style>

        body {
            font-family: sans-serif;
            margin: 0;
        }
        table {
            margin: 0 auto;
          border-collapse: collapse;
          width: 95%;
          margin-top: auto;
        }
        caption {
          text-align: left;
          font-size: 21px;
          font-weight: bold;
          margin-left: 2px;
          margin-top: 10px;
          margin-bottom: 5px; 
          color: #3F2822;
          text-shadow: 1px 0 1px black;
        }
        th, td {
          padding: 10px;
          border: 1px solid #3F2822;
          
        }
        th {
            border: 1px solid #3F2822;
            background-color: #DFD1C0;
            color: #3F2822;
            text-shadow: 1px 1px 1px #808080;
        }
        h1{
            font-family: Impact;
            font-size: 40px;
            letter-spacing: 3px;
            text-align: center;
            margin: 40px;
            color: #3F2822;
            text-shadow: 2px 2px 2px white;
        }
        h3 {
            margin-left: 22px;
            color: #3F2822;
            margin-top: 5px;
        }
        nav {
            background-color: #DFD1C0;
            padding: 5px;
            box-shadow: 0 2px 4px black;
        }

      </style>
      <table id="Tabla1">
        <nav>
            <h1>MÉTRICAS DE VENTAS</h1>
        </nav>
        <h3>Fecha: ${fecha}</h3>
        <caption>Tipo de pago en compras finalizadas</caption>
        <thead>
          <tr>
            <th>Transferencias</th>
            <th>Criptomonedas</th>
            <th>Tarjeta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$${dataTable1["total sales amount by Transfer Payment"]}</td>
            <td>$${dataTable1["total sales amount by Crypto Payment"]}</td>
            <td>$${dataTable1["total sales amount by Cards Payment"]}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <table id="Tabla2">
      <caption>Método de pago</caption>
      <thead>
        <tr>
          <th>Transferencias</th>
          <th>Criptomonedas</th>
          <th>Tarjeta</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>$${dataTable1["total sales by Cards Payment"]}</td>
            <td>$${dataTable1["total sales by Crypto Payment"]}</td>
            <td>$${dataTable1["total sales by Transfer Payment"]}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <table id="Tabla3">
    <caption>Promedio de ventas</caption>
    <thead>
      <tr>
        <th>Minima Historica</th>
        <th>Venta Promedio</th>
        <th>Mayor Historica</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>$${dataTable3[0].value}</td>
      <td>$${dataTable3[1].value}</td>
      <td>$${dataTable3[2].value}</td>
      </tr>
    </tbody>
    </table>
    <br>
    <table id="Tabla4">
        <caption>Productos más vendidos</caption>
        <thead>
        <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Ventas</th>
        </tr>
        </thead>
        <tbody> 
        ${dataTable4.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.sales}</td>
            </tr>
        `).join('')}
    </tbody>
    </table>
    <br>
    <table id="Tabla5">
        <caption>Ordenes de compras finalizadas</caption>
        <thead>
        <tr>
        <th>Pedidos Totales</th>
        <th>No Comprados</th>
        <th>Comprados</th>
        </tr>
        </thead>
        <tbody>
            <tr>
            <td>$${dataTable5.totalOrders}</td>
            <td>$${dataTable5.notPurchasedOrders}</td>
            <td>$${dataTable5.purchasedOrders}</td>
            </tr>
        </tbody>
    </table>
    `;

    pdf.create(html).toStream((err, stream) => {
        if (err) return res.status(500).send(err);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=tabla.pdf');
        stream.pipe(res);
    });
}

module.exports = {
    PDFMetrics
}
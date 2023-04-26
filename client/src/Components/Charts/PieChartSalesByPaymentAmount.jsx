import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie'
import s from './PieChartSalesByPayment.module.css'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PieChartSalesByPaymentAmount = ( ) => {
    const [data, setData] = useState([]);
    function transformData(data) {
        return [
          {
            id: "Criptomoneda",
            label: "Criptomoneda",
            value: data["total sales amount by Crypto Payment"],
          },
          {
            id: "Tarjeta",
            value: data["total sales amount by Cards Payment"]
          },
            {
            id: "Transferencia",
            value: data["total sales amount by Transfer Payment"]
            },
        ];
      }
      
      const transformedData = transformData(data);
      console.log(transformedData);
    useEffect(() => {
        axios.get('http://localhost:3001/metric/purchasedCartsByCardPayment')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    return (
        <div className={s.container} >
            <div>

                    <h1>Tipo de pago en compras finalizadas</h1>
        <p>{`Ventas Finalizadas: $${data["total sales amount"]}`}</p>
    
            </div>

    <ResponsivePie
        data={transformedData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'red_grey' }}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        enableArcLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#ffffff"
        legends={[]}
        />
        </div>
)}

export default PieChartSalesByPaymentAmount
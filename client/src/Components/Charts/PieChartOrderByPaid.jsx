import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie'
import s from './PieChartOrderByPaid.module.css'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PieChartOrderByPaid = ( ) => {
    const [data, setData] = useState([]);
    function transformData(data) {
        return [
          {
            id: "Ordenes de Compra no Finalizadas",
            value: data["notPurchasedOrders"],
            label: "No Finalizadas",
          },
          {
            id: "Ordenes de Compra Finalizadas",
            value: data["purchasedOrders"],
            label: "Finalizadas",
          }
        ];
      }
      
      const transformedData = transformData(data);
      console.log(transformedData);
      useEffect(() => {
        axios.get('/metric/purchasedCarts')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    return (
        <div className={s.containerCF} >
            <div>
            <p className={s.title}>Ordenes de compras finalizadas</p>
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
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#ffffff"
        legends={[]}
        />
         <p className={s.text}> {`Total de Ordenes de Compra: ${data["totalOrders"]}`}</p>
        <p className={s.text}>{`Ordenes sin concluir: ${data["notPurchasedOrders"]} (%${data["percentageNotPurchased"]})`}</p>
        <p className={s.text}>{`Compras realizadas: ${data["purchasedOrders"]} (%${data["percentage"]})`}</p>
       
        </div>
)}

export default PieChartOrderByPaid
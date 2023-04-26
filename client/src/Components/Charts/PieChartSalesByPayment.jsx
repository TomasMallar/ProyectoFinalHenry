import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie'
import s from './PieChart.module.css'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PieChart = ( ) => {
    const [data, setData] = useState([]);
    function transformData(data) {
        return [
          {
            id: "Criptomoneda",
            label: "Criptomoneda",
            value: data["total sales by Crypto Payment"],
            "color": "hsl(228, 70%, 50%)"
          },
          {
            id: "Tarjeta",
            value: data["total sales by Cards Payment"]
          },
            {
            id: "Transferencia",
            value: data["total sales by Transfer Payment"]
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
        <p>{`Ventas Finalizadas: ${data["total sales with any payment"]}`}</p>
        <p>{`Pago con Tarjeta: ${data["total sales by Cards Payment"]} (%${data["percentage of purchased carts by Cards Payment"]})`}</p>
        <p>{`Pago con Criptomoneda: ${data["total sales by Crypto Payment"]} (%${data["percentage of purchased carts by Crypto Payment"]})`}</p>
        <p>{`Pago con Transferencia: ${data["total sales by Transfer Payment"]} (%${data["percentage of purchased carts by Transfer Payment"]})`}</p>
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
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        />
        </div>
)}

export default PieChart
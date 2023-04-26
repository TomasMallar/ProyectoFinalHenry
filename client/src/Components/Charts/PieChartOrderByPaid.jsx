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
        axios.get('http://localhost:3001/metric/purchasedCarts')
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

            <h1>Ordenes de compras finalizadas</h1>
        <p>{`Total de Ordenes de Compra: ${data["totalOrders"]}`}</p>
        <p>{`Ordenes sin concluir: ${data["notPurchasedOrders"]} (%${data["percentageNotPurchased"]})`}</p>
        <p>{`Compras realizadas: ${data["purchasedOrders"]} (%${data["percentage"]})`}</p>
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
        arcLabelsTextColor="#ffffff"
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

export default PieChartOrderByPaid
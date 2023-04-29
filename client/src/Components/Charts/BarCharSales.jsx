import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ResponsiveBar } from '@nivo/bar'
import s from './BarCharSales.module.css'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarCharSales = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      axios.get('/metric/average-amount-sales')
        .then(response => {
          console.log(response.data)
            setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
    return (
        <div className={s.container}>

        <ResponsiveBar
        data={data}
        keys={
            ['value']
        }
        indexBy="sales"
        valueFormat=" >-$"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.1}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'VENTAS',
            legendPosition: 'middle',
            legendOffset: 40,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'MONTOS',
            legendPosition: 'middle',
            legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[]}
        isInteractive={false}
        role="application"
        isFocusable={true}
        ariaLabel="Nivo bar chart demo"
        />
        </div>
)}

export default BarCharSales
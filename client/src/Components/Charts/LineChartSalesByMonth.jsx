import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import s from './LineChartSalesByMonth.module.css';

const LineChartSalesByMonth = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3001/metric/total-sales-orders-by-month`)
          .then(response => {
  
              const currentYear = new Date().getFullYear().toString();
              console.log(currentYear);
              console.log(response.data);
              const filteredData = response.data.filter(item => item.year.toString().includes(currentYear));
        console.log(filteredData);
  
            const data = filteredData.map(sale => {
              const month = sale.month < 10 ? `0${sale.month}` : sale.month;
              return {
                x: `${sale.year}-${month}`,
                y: sale.total_sales_amount,
              };
            });
            setData(data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    return (
        <div className={s.container}>
          <p className={s.title}>VENTAS MENSUALES</p>
      <ResponsiveLine
    data={[{ id: 'Sales', data: data }]}
    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'MESES',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'COBROS',
      legendOffset: -50,
      legendPosition: 'middle',
    }}
    colors={{ scheme: 'nivo' }}
    pointSize={8}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
  />
          <p className={s.link}>Ver más métricas</p>

  </div>
)}

export default LineChartSalesByMonth;
  
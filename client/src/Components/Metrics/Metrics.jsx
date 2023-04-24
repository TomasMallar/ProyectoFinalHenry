import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

function Metric() {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3001/metric/purchasedCartsByCardPayment')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const chart = d3.select(chartRef.current);

    // Configura las dimensiones del gráfico
    const width = 500;
    const height = 300;

    // Configura el radio del gráfico
    const radius = Math.min(width, height) / 2;

    // Configura los datos para el gráfico de torta
    const pie = d3.pie()
      .value(d => d.value);
    const dataPie = pie(Object.entries(data).map(([key, value]) => ({ key, value })));

    // Configura los colores para el gráfico de torta
    const color = d3.scaleOrdinal()
      .domain(dataPie.map(d => d.data.key))
      .range(d3.schemeCategory10);

    // Agrega los arcos para el gráfico de torta
    const arc = d3.arc()
      .innerRadius(radius / 2)
      .outerRadius(radius - 10);

    const arcGroup = chart.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    arcGroup.selectAll('.arc')
      .data(dataPie)
      .enter()
      .append('path')
      .attr('class', 'arc')
      .attr('d', arc)
      .attr('fill', d => color(d.data.key));

    // Agrega la leyenda al gráfico de torta
    const legend = chart.append('g')
      .attr('transform', `translate(${width - 100}, ${height / 2 - (dataPie.length - 1) * 15 / 2})`);

    legend.selectAll('.legend')
      .data(dataPie)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0, ${i * 15})`);

    legend.selectAll('.legend rect')
      .data(dataPie)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', d => color(d.data.key));

    legend.selectAll('.legend text')
      .data(dataPie)
      .enter()
      .append('text')
      .attr('x', 15)
      .attr('y', 10)
      .text(d => d.data.key);
  }, [data]);

    return (
<div style={{ position: 'relative', top: '50px', left: '50px', width: '100vw', height: '900px' }}>
      <svg ref={chartRef} width="100%" height="100%" />
</div>
);
}
    
    export default Metric;

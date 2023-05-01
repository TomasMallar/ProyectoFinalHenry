import s from './OrdersTable.module.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetOrdersInfo } from '../../Redux/Actions/ActionsDashboard';
import { useDispatch, useSelector } from 'react-redux';
import Roow from './Row';
import createData from './CreateData';
 import { useEffect } from 'react';

export default function CollapsibleTable() {
    const dispatch = useDispatch()
    const ordersInfo = useSelector(state => state.ordersInfo.report)
console.log(ordersInfo, 'fghghf');

useEffect (()=> {
    dispatch(GetOrdersInfo())
   
},[])

const rows =
 ordersInfo?.map ((order)=> createData(order.user.name,order.user.surname,order.user.mail, order.id,order.createdAt, order.status, order.items ))

return (

    <TableContainer component={Paper} className={s.dataTable}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><b>USUARIO</b></TableCell>
            <TableCell align="right"><b>MAIL</b></TableCell>
            <TableCell align="right"><b>ORDEN Nº</b></TableCell>
            <TableCell align="right"><b>IMPORTE ($)</b></TableCell>
            <TableCell align="right"><b>FECHA</b></TableCell>
            <TableCell align="right"><b>ESTADO</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <Roow key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
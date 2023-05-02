import React from 'react';
import { getUserOrder } from '../../Redux/Actions/Actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './MyShopping.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Roow from './Row';
import createData from './CreateData';
import s from './OrdersTable.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const MyShopping = () => {
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const {id} = JSON.parse(localStorage.getItem('user'));

const pages = useSelector(state => state.order.totalPages)

const [pageQuery, setPageQuery] = useState(1)

useEffect(() => {
  dispatch(getUserOrder(id, pageQuery))
}, [dispatch, pageQuery])

const rows =
order.report?.map((order) => createData(order.user?.name, order.user?.surname, order.user?.mail, order.id, order.createdAt, order.status, order.items, order.sale?.id, order.sale?.paymentMethod, order.sale?.status, id))
console.log(rows);
const handleChange = (event, value) => {
  setPageQuery(value);
}

  return (
    <div>
      <Typography variant='h3' sx={{padding: '20px'}}>Mis órdenes</Typography>
      <TableContainer component={Paper} className={s.dataTable}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell className={s.header} />
              <TableCell className={s.header}><b>USUARIO</b></TableCell>
              <TableCell className={s.header} align="right"><b>MAIL</b></TableCell>
              <TableCell className={s.header} align="right"><b>ORDEN Nº</b></TableCell>
              <TableCell className={s.header} align="right"><b>PAGO Nº</b></TableCell>
              <TableCell className={s.header} align="right"><b>MÉTODO DE PAGO</b></TableCell>
              <TableCell className={s.header} align="right"><b>IMPORTE ($)</b></TableCell>
              <TableCell className={s.header} align="right"><b>FECHA</b></TableCell>
              <TableCell className={s.header} align="right"><b>ESTADO</b></TableCell>
              <TableCell className={s.header} align="right"><b>CANCELAR</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <Roow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} className={s.pages}>
                <Pagination count={pages} onChange={handleChange} size="large"/>
            </Stack>
    </div>
  );
};

export default MyShopping;

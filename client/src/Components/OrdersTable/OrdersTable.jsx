import s from './OrdersTable.module.css'
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
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
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function CollapsibleTable() {
  const dispatch = useDispatch()
  const ordersInfo = useSelector(state => state.ordersInfo.report)


  const pages = useSelector(state => state.ordersInfo.totalPages)

  const [pageQuery, setPageQuery] = useState(1)


  useEffect(() => {
    dispatch(GetOrdersInfo(pageQuery))

  }, [dispatch, pageQuery])

  const rows =
    ordersInfo?.map((order) => createData(order.user?.name, order.user?.surname, order.user?.mail, order.id, order.createdAt, order.status, order.items))

  const handleChange = (event, value) => {
    setPageQuery(value);
  }
  return (
    <div>
        <Stack spacing={2} className={s.pages}>
                <Pagination count={pages} onChange={handleChange}size="large" />
            </Stack>
      <TableContainer component={Paper} className={s.dataTable}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell className={s.header} />
              <TableCell className={s.header}><b>USUARIO</b></TableCell>
              <TableCell className={s.header} align="right"><b>MAIL</b></TableCell>
              <TableCell className={s.header} align="right"><b>ORDEN Nº</b></TableCell>
              <TableCell className={s.header} align="right"><b>IMPORTE ($)</b></TableCell>
              <TableCell className={s.header} align="right"><b>FECHA</b></TableCell>
              <TableCell className={s.header} align="right"><b>ESTADO</b></TableCell>
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
}
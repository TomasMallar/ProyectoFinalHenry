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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetOrdersInfo } from '../../Redux/Actions/ActionsDashboard';
import { useDispatch, useSelector } from 'react-redux';
import Row from './Row';
import { cancelOrderUser } from '../../Redux/Actions/Actions';
import Swal from 'sweetalert2';


export default function Roow(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    const cancelOrder = () => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción cancelará la orden',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No, mantener'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(cancelOrderUser(row.saleId, row.id));
          Swal.fire('Orden cancelada', '', 'success').then(() => {
            window.location.reload();
          });
        }
      });
    };
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.mail}</TableCell>
          <TableCell align="right">{row.orderId}</TableCell>
          <TableCell align="right">{row.saleId}</TableCell>
          <TableCell align="right">{row.paymentMethod}</TableCell>
          <TableCell align="right">{row.totalAmount}</TableCell>
          <TableCell align="right">{row.date}</TableCell>
          <TableCell align="right">{row.statusSale}</TableCell>
          <TableCell align="right">
            {row.statusSale !== "pending" ? (
              <button disabled>-</button>
            ) : (
              <button onClick={cancelOrder}>Cancelar</button>

           )}
</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Detalle de la órden:
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Item</TableCell>
                      <TableCell>Id</TableCell>
                      <TableCell align="right">Cantidad</TableCell>
                      <TableCell align="right">Precio Unitario ($)</TableCell>
                      <TableCell align="right">Precio Total ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.id}>
                        <TableCell component="th" scope="row">
                          {historyRow.name}
                        </TableCell>
                        <TableCell>{historyRow.id}</TableCell>
                        <TableCell align="right">{historyRow.quantity}</TableCell>
                        <TableCell align="right">{historyRow.itemPrice}</TableCell>
                        <TableCell align="right">
                          {historyRow.totalPrice}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
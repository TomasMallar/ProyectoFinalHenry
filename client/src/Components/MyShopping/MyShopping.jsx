import React from 'react';
import { getUserOrder } from '../../Redux/Actions/Actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './MyShopping.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Roow from './Row';
import createData from '../OrdersTable/CreateData';
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
  console.log(order);
  const dispatch = useDispatch();
  const id = sessionStorage.getItem('id');
//   const [page, setPage] = useState(1);
//   const { orders, totalPages } = order;
// console.log(orders);
//   useEffect(() => {
//     dispatch(getUserOrder(id, page));
//   }, [page]);

//   const handlePage = (e) => {
//     setPage(e.target.value);
//   };

//   const buttonVisible = () => {
//     const buttons = [];
//     for (let i = 1; i < totalPages + 1; i++) {
//       buttons.push(i);
//     }
//     return buttons;
//   };

const pages = useSelector(state => state.order.totalPages)

const [pageQuery, setPageQuery] = useState(1)

useEffect(() => {
  dispatch(getUserOrder(id, pageQuery))
}, [dispatch, pageQuery])

const rows =
order.report?.map((order) => createData(order.user?.name, order.user?.surname, order.user?.mail, order.id, order.createdAt, order.status, order.items))

const handleChange = (event, value) => {
  setPageQuery(value);
}

  return (
    // <div className={style.container}>
    //   {/* <Link to='/myprofile'>My Profile</Link> */}
    //   <h2 className={style.title}>MY SHOPPINGS</h2>
    //   <h2 className={style.title}>MY ORDERS</h2>
    //   <div className={style.divInfo}>
    //     {Array.isArray(orders) ? (
    //       orders.flatMap((el) => (
    //         <div className={style.dataOrders}>
    //           <div>
    //             <h2 className={style.titleSub}>Número de orden</h2>
    //             <p className={style.statusId}>{el.id}</p>
    //             <hr />
    //             <h2 className={style.titleSub}>Estado</h2>
    //             <h3 className={style.statusId}>{el.status}</h3>
    //           </div>
    //           <hr />
    //           {el.items?.flatMap((item) => (
    //             <div>
    //               <h2 className={style.titleSub}>Producto</h2>
    //               <div className={style.divProduct}>
    //                 <div>
    //                   <p className={style.titleProduct}>Nombre</p>
    //                   <p className={style.textProduct}>{item.product.name}</p>
    //                 </div>
    //                 <div>
    //                   <p className={style.titleProduct}>Precio</p>
    //                   <p className={style.textProduct}>$ {item.product.price}</p>
    //                 </div>
    //               </div>
    //             </div>
    //           ))}
    //           <div>
    //             <hr />
    //             <h2 className={style.titleSub}>Total</h2>
    //             <h3 className={style.statusId}>$ {el.total}</h3>
    //           </div>
    //           <button>Cancelar</button>
    //         </div>
    //       ))) : 
    //       <p>No hay ordenes</p>}
    //   </div>
    //   <div>
    //     {buttonVisible().map((pageCurrent) => (
    //       <button value={pageCurrent} onClick={handlePage} className={style.button}>
    //         {pageCurrent}
    //       </button>
    //     ))}
    //   </div>
    // </div>
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

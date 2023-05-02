// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import createData from './CreateData';
// import {useSelector} from  'react-redux'
// import Row from './rows';
// import s from './userOrdersList.module.css'


// export default function UserOrdersList() {

//   const userOrdersInfo = useSelector (state => state.userInfo.report)
//   console.log(userOrdersInfo, "soy userInfo")
//   const rows = userOrdersInfo?.map (order => {
//     return createData(order.id, order.status, order.date, order.items)
//   })

//   return (
//     <div>
//       <Stack spacing={2} className={s.pages}>
//                 <Pagination count={10} size="large" />
//             </Stack>
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Id de la Órden</TableCell>
//             <TableCell align="right">Estado</TableCell>
//             <TableCell align="right">Fecha</TableCell>
//             <TableCell align="right">Monto</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))}
//         </TableBody>
//       </Table>
    // </TableContainer>
    // <Stack spacing={2} className={s.pages}>
    //             <Pagination count={9} size="large"/>
    //         </Stack>
//     </div>
//   );
// }
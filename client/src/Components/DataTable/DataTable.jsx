import s from './DataTable.module.css'
import { DataGrid } from '@mui/x-data-grid';

import {
  useEffect, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DeleteUser, GetUserInfo, GetUsersInfo } from '../../Redux/Actions/ActionsDashboard';
import UserOrdersList from '../userOrdersList/userOrderList';
import { Pagination, Stack } from '@mui/material';
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
import createData from '../userOrdersList/CreateData';
import Row from '../userOrdersList/rows';

export default function DataTable() {

  const [userSelected, setUserSelected] = useState("")
  const [openModal, setOpenModal] = useState(false);



  const dispatch = useDispatch()

  const users = useSelector(state => state.usersInfo)
  const user = useSelector(state => state.userInfo)
  console.log(users);
  const pages = useSelector(state => state.userInfo.totalPages)

  const [pageQuery, setPageQuery] = useState(1)
  const filas = user.report?.map(order => {
    return createData(order.id, order.status, order.createdAt, order.items)
  })

  console.log(user, "soy user")

  useEffect(() => {
    dispatch(GetUsersInfo())
    dispatch(GetUserInfo(userSelected, pageQuery))
  }, [dispatch, userSelected, pageQuery])


  const handleButtonClickDelete = (event) => {
    setUserSelected(event.target.value)
    dispatch(DeleteUser(event.target.value))
  }
  const handleButtonClickDetail = (event) => {

    dispatch(GetUserInfo(event.target.value,pageQuery))
    setUserSelected(event.target.value);
    setOpenModal(true);

  }

  const Modal = () => {
    const handleClose = () => {
      setOpenModal(false);

    }
    const handleChange = (event, value) => {
      setPageQuery(value);
    }
    return (
      <div className={s.modal}>
        <button className={s.closeButton} onClick={handleClose}>X</button>

        <Stack spacing={2} className={s.pages}>
          <Pagination sx={{'& .MuiPaginationItem-root': {
              color: '#fff',
            },
            '& .Mui-selected': {
              color: '#3F2822',
              backgroundColor: '#f5e7d2',
            },
          }}
          count={pages} 
          onChange={handleChange} 
          size="large" />
        </Stack>

        <TableContainer component={Paper} className={s.tabla}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell className={s.header} />
                <TableCell className={s.header} align="right">Id de la Órden</TableCell>
                <TableCell className={s.header} align="right">Estado</TableCell>
                <TableCell className={s.header} align="right">Fecha</TableCell>
                <TableCell className={s.header} align="right">Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {filas?.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };


  const columns = [
    { field: 'id', headerName: 'ID', width: 70 ,headerClassName: s.header},
    { field: 'firstName', headerName: 'NOMBRE', width: 130 ,headerClassName: s.header},
    { field: 'lastName', headerName: 'APELLIDO', width: 130 ,headerClassName: s.header},
    {
      field: 'age',
      headerName: 'EDAD',
      width: 90,
      headerClassName: s.header,
    },
    {
      field: 'mail',
      headerName: 'MAIL',
      width: 160,
      headerClassName: s.header,

    },
    {
      field: 'phone',
      headerName: 'TELEFONO',
      sortable: true,
      width: 160,
      headerClassName: s.header,

    },
    {
      field: 'birthday',
      headerName: 'FECHA DE NACIMIENTO',
      sortable: true,
      width: 160,
      headerClassName: s.header,

    },
    {
      field: 'button',
      headerName: 'ORDENES DE COMPRA',
      width: 120,
      headerClassName: s.header,
      renderCell: (params) => {

        return (
          <button className={s.ButtonDetail} variant="contained" color="primary" value={params.row.id} onClick={handleButtonClickDetail}>
            Ver
          </button>
        );
      },
    },
    {
      field: 'but',
      headerName: 'ELIMINAR USUARIO',
      width: 120,
      headerClassName: s.header,
      renderCell: (params) => {

        return (
          <button className={s.buttonDelete} variant="contained" color="primary" value={params.row.id} onClick={handleButtonClickDelete}>
            Eliminar
          </button>
        );
      },
    },

  ];



  const rows = users.map(user => {

    const hoy = new Date();
    const fechaNac = new Date(user.date_of_birth);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    return { id: user.id, lastName: user.surname, firstName: user.name, age: edad, mail: user.mail, phone: user.phone, birthday: user.date_of_birth }
  })


  return (
    <div className={s.dataTable}>
      {openModal ? <Modal /> : null}
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        paginationModel={{ page: 0, pageSize: 10 }}
        className={s.info}
      >
      </DataGrid>

    </div>
  )
}
import s from './DataTable.module.css'
import { DataGrid } from '@mui/x-data-grid';

import { useEffect, useState
 } from 'react';
 import {useDispatch, useSelector} from 'react-redux'
 import { DeleteUser, GetUserInfo, GetUsersInfo } from '../../Redux/Actions/ActionsDashboard';
export default function DataTable (){

const [userSelected, setUserSelected] = useState("")
const [openModal, setOpenModal] = useState(false);



const dispatch = useDispatch()

const users = useSelector(state => state.usersInfo)
const user = useSelector (state => state.userInfo)

console.log(user, "soy user")

  useEffect(()=>{
    dispatch (GetUsersInfo())
},[dispatch, userSelected])


const handleButtonClickDelete = (event) => {
  setUserSelected(event.target.value)
  dispatch (DeleteUser(event.target.value))
}
const handleButtonClickDetail= (event) => {
 
  dispatch (GetUserInfo(event.target.value))
  setUserSelected(event.target.value);
  setOpenModal(true);

}

const Modal = () => {
  const handleClose = () => {
    setOpenModal(false);

  }
  return (
    <div className={s.modal}>
      <button className={s.closeButton}  onClick={handleClose}>X</button>
      <h2>{user.name}</h2>
      <p>{user.surname}</p>
    </div>
  );
};
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'NOMBRE', width: 130 },
        { field: 'lastName', headerName: 'APELLIDO', width: 130 },
        {
          field: 'age',
          headerName: 'EDAD',
          type: 'number',
          width: 90,
        },
        {
          field: 'mail',
          headerName: 'MAIL',
          width: 160,
         
        },
        {
          field: 'phone',
          headerName: 'TELEFONO',
          sortable: true,
          width: 160,
         
        },
        {
          field: 'birthday',
          headerName: 'FECHA DE NACIMIENTO',
          sortable: true,
          width: 160,
         
        },
        {
          field: 'button',
          headerName: 'DETALLES',
          width: 120,
          renderCell: (params) => {
              
              return (
                  <button className={s.ButtonDetail} variant="contained" color="primary" value={params.row.id} onClick={ handleButtonClickDetail}>
                      Ver más 
                  </button>
              );
          },
      },
      {
        field: 'but',
        headerName: 'ELIMINAR USUARIO',
        width: 120,
        renderCell: (params) => {
            
            return (
                <button className={s.buttonDelete}variant="contained" color="primary" value={params.row.id} onClick={handleButtonClickDelete}>
                    Eliminar
                </button>
            );
        },
    },
    
  ];



      const rows = users.map (user => {
        
          const hoy = new Date();
          const fechaNac = new Date(user.date_of_birth);
          let edad = hoy.getFullYear() - fechaNac.getFullYear();
          const mes = hoy.getMonth() - fechaNac.getMonth();
          if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
          }
          
       return  {id:user.id, lastName: user.surname, firstName:user.name, age:edad, mail:user.mail, phone:user.phone, birthday:user.date_of_birth}
      })
      

    return (
    <div className={s.dataTable}>
      {openModal ? <Modal /> : null}
 <DataGrid
  rows={rows}
  columns={columns}
  getRowId={(row) => row.id}
  paginationModel={{ page: 0, pageSize: 10 }}
>
</DataGrid>

    </div>
    )
}
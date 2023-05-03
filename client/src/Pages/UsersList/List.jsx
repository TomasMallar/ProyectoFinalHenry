import s from './List.module.css'
import SideBar from '../../Components/SideBar/SideBar'
import DataTable from '../../Components/UsersDataTable/DataTable'

export default function Users(){

    return (
        <div className={s.list}>
            <SideBar/>
            <div className={s.listContainer}>
            <p className={s.top}>USUARIOS</p>
            <DataTable/>
            </div>
        </div>
    )
}
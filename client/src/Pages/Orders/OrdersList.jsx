import s from './OrdersList.module.css'
import SideBar from '../../Components/SideBar/SideBar'
import CollapsibleTable from '../../Components/OrdersTable/OrdersTable'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { GetOrdersInfo } from '../../Redux/Actions/ActionsDashboard'

export default function Orders(){
  

    return (
        <div className={s.list}>
            <SideBar/>
            <div className={s.listContainer}>
            <p className={s.top}>ORDENES</p>
         <CollapsibleTable/>
            </div>
        </div>
    )
}
import s from './OrdersList.module.css'
import SideBar from '../../Components/SideBar/SideBar'
import CollapsibleTable from '../../Components/OrdersTable/OrdersTable'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { GetOrdersInfo } from '../../Redux/Actions/ActionsDashboard'
import { Fade } from 'react-reveal';

export default function Orders() {


    return (
        <Fade>

            <div className={s.list}>
                <SideBar />
                <div className={s.listContainer}>
                    <p className={s.top}>VENTAS DETALLE</p>
                    <CollapsibleTable />
                </div>
            </div>
        </Fade>
    )

}
import s from './Sales.module.css'
import SideBar from '../../Components/SideBar/SideBar'
import SalesList from '../../Components/SalesList/SalesList'
import { Fade } from 'react-reveal';

export default function Users() {

    return (
        <Fade>
            <div className={s.list}>
                <SideBar />
                <div className={s.listContainer}>
                    <p className={s.top}>VENTAS</p>
                    <SalesList />
                </div>
            </div>
        </Fade>
    )
}
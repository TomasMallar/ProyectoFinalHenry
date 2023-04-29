import style from './Dashboard.module.css'
import SideBar from '../../Components/SideBar/SideBar'
import Widget from '../../Components/Widget/widget'
import PieChartSalesByPayment from '../../Components/Charts/PieChartSalesByPayment'
import NavBar from '../../Components/NavBar/NavBar'
import LineChartSalesByMonth from '../../Components/Charts/LineChartSalesByMonth'
import Fade from "react-reveal";


export default function Dashboard() {

    return (
        <div>
            <div className={style.dashboardContainer}>
                <Fade cascade>
                    <SideBar className={style.sideBar} />
                    <div>
                        <p className={style.PrincipalTitle}>DASHBOARD</p>
                        <div className={style.homeContainer}>
                            <div className={style.widgets}>
                                <Widget className={style.widget} type="user" />
                                <Widget className={style.widget} type="earning" />
                                <Widget className={style.widget} type="order" />
                                <Widget className={style.widget} type="balance" />
                            </div>
                        </div>

                        <div className={style.charts}>
                            <LineChartSalesByMonth />
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    )
}
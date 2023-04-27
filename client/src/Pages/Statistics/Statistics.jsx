import style from './Statistics.module.css'
import SideBar from '../../Components/SideBar/SideBar'
import PieChartSalesByPayment from '../../Components/Charts/PieChartSalesByPayment';
import PieChartOrderByPaid from '../../Components/Charts/PieChartOrderByPaid';
import PieChartSalesByPaymentAmount from '../../Components/Charts/PieChartSalesByPaymentAmount';
import BarCharProductSold from '../../Components/Charts/BarCharProductSold';
import LineChartSalesByMonth from '../../Components/Charts/LineChartSalesByMonth';
import BarCharSales from '../../Components/Charts/BarCharSales';
import NavBar from '../../Components/NavBar/NavBar';

export default function Statistics() {

    return (
        <div>
        
        <div className={style.statisticsContainer}>
            <SideBar className={style.sideBar} />
<div>
            <div className={style.homeContainer}>
              
                    <h2 className={style.PrincipalTitle}>Métricas de Ventas</h2>
                <div className={style.charts}>
                    <PieChartSalesByPaymentAmount/>
                    <PieChartSalesByPayment/>
                    <BarCharSales />
                    <div className={style.chartsContainer}>
                    <BarCharProductSold/>
                    <PieChartOrderByPaid/>
                    </div>
                </div>
            </div>

            <div className={style.charts}>
                
            </div>
            </div>
        </div>
        </div>

    )
}
import style from './Dashboard.module.css'
import SideBar from '../../Components/SideBar/SideBar'
import Widget from '../../Components/Widget/widget'
export default function Dashboard() {

    return (
        <div className={style.dashboardContainer}>
            <SideBar className={style.sideBar} />
            <div className={style.homeContainer}>
                <Widget className={style.widget} type="user"/>
                <Widget className={style.widget} type="order"/>
                <Widget className={style.widget} type="earning"/>
                <Widget className={style.widget} type="balance"/>

            </div>
       
        </div>
    )
}
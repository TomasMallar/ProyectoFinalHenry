import style from './SideBar.module.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


export default function SideBar() {
    return (
        <div className={style.sideBar}>

            <div className={style.top}>
                <span className={style.logo}>The Chocolate Hub</span>
            </div>
            <hr className={style.hr} />
            <div className={style.center}>
                <ul>
                    <p className={style.title}>PRINCIPAL</p>
                    <li className={style.li}>
                        <DashboardIcon className={style.icon} />
                        <span className={style.span}>DashBoard</span></li>
                        <p className={style.title}>LISTAS</p>

                    <li className={style.li}>
                        <StorefrontIcon className={style.icon}/>
                        <span className={style.span}>Productos</span></li>
                    <li className={style.li}>
                        <PeopleAltOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Usuarios</span></li>

                    <li className={style.li}>
                        <PaymentOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Ordenes</span></li>


                    <li className={style.li}>
                        <LocalShippingOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Envios</span></li>
                    <p className={style.title}>UTILIDADES</p>
                    <li className={style.li}>
                        <QueryStatsOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Estadísticas</span></li>

                    <li className={style.li}>
                        <NotificationsOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Notifications</span></li>
                    <p className={style.title}>SERVICIOS</p>
                    <li className={style.li}>

                        <SettingsSystemDaydreamOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Sistema</span></li>
                    <li className={style.li}>
                        <PsychologyOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Logs</span></li>
                    <li className={style.li}>
                        <SettingsSuggestOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Ajustes</span></li>
                    <p className={style.title}>USUARIO</p>

                    <li className={style.li}>
                        <AccountCircleOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Mi Perfil</span></li>
                    <li className={style.li}>
                        <LockOutlinedIcon className={style.icon}/>
                        <span className={style.span}>Logout</span></li>



                </ul>
            </div>
        </div>
    )
}
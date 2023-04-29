import style from './SideBar.module.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function SideBar() {

    const history = useHistory()
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userRole");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("Name");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("mail");
        history.push("/home");
        window.location.reload();
    };
    return (
        <div className={style.sideBar}>

            <div className={style.top}>
                <span className={style.logo}>The Chocolate Hub <br /> Administrador </span>
            </div>
            <hr className={style.hr} />
            <div className={style.center}>
                <ul>
                    <p className={style.title}>PRINCIPAL</p>
                    <Link to='/dashboard'><li className={style.li}>
                        <DashboardIcon className={style.icon} />
                        <span className={style.span}>DashBoard</span> </li>
                    </Link>
                    <p className={style.title}>LISTAS</p>

                    <Link to="/crudProducts">  <li className={style.li}>
                        <StorefrontIcon className={style.icon} />
                        <span className={style.span}>Productos</span></li>
                    </Link>
                    <li className={style.li}>
                        <PeopleAltOutlinedIcon className={style.icon} />
                        <span className={style.span}>Usuarios</span></li>
                    <Link to="/orders">
                    <li className={style.li}>
                        <PendingActionsIcon className={style.icon} />
                        <span className={style.span}>Órdenes</span></li>
                        </Link>

                        <Link to="">
                    <li className={style.li}>
                        <PaymentsIcon className={style.icon} />
                        <span className={style.span}>Ventas</span></li>
                        </Link>


                    {/* <li className={style.li}>
                        <LocalShippingOutlinedIcon className={style.icon} />
                        <span className={style.span}>Envios</span></li> */}
                    <p className={style.title}>UTILIDADES</p>
                    <Link to='/statistics'> <li className={style.li}>
                        <QueryStatsOutlinedIcon className={style.icon} />
                        <span className={style.span}>Estadísticas</span></li>
                    </Link>
                    {/* <li className={style.li}>
                        <NotificationsOutlinedIcon className={style.icon} />
                        <span className={style.span}>Notifications</span></li> */}
                    {/* <p className={style.title}>SERVICIOS</p>
                    <li className={style.li}>

                        <SettingsSystemDaydreamOutlinedIcon className={style.icon} />
                        <span className={style.span}>Sistema</span></li>
                    <li className={style.li}>
                        <PsychologyOutlinedIcon className={style.icon} />
                        <span className={style.span}>Logs</span></li>
                    <li className={style.li}>
                        <SettingsSuggestOutlinedIcon className={style.icon} />
                        <span className={style.span}>Ajustes</span></li> */}
                    <p className={style.title}>USUARIO</p>

                    <Link to="/home">  <li className={style.li}>
                        <AccountCircleOutlinedIcon className={style.icon} />
                        <span className={style.span}>HomePage</span></li>
                        </Link>
                    <li className={style.li}>
                        <LockOutlinedIcon className={style.icon} />
<div>
{sessionStorage.getItem("token") ? (
                    <div>
                        <li>
                            <button className={style.span} onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </div>
                ) : (
                    <Link to="/login" className="text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif ">
                        <li>
                            <button className={style.span}>
                                Login
                            </button>
                        </li>
                    </Link>
                )}
    </div>                
  </li>



                </ul>
            </div>
        </div>
    )
}
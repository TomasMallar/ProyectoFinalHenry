import { Link, useHistory } from "react-router-dom"
import style from './NavBar.module.css'
import carImagen from "../../img/shopping-cart.png"
import logo from "../../img/logoBlack.png"
import MenuProfile from "../MenuProfile/MenuProfile";

export default function NavBar() {
    const history = useHistory();
    const userRole = sessionStorage.getItem('userRole');
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
        <div className="sticky top-0 z-20 flex justify-between w-full shadow-md bg-chocolate-mantecol">
            <Link to="/Home" >
            <div>
                <img src={logo} alt="" className="w-60 mt-2.5 mb-5" />
            </div>
            </Link>
            <ul className="flex p-2.5 items-center justify-center">

                <Link to="/home" className="text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif">
                    <li>
                        Home
                    </li>
                </Link>

                <Link to="/products" className="text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif">
                    <li>
                        Products
                    </li>
                </Link>
                <Link to="/about" className="text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif">
                    <li>
                        About Us
                    </li>
                </Link>

                {userRole === '2' && (
                    <Link to="/crudProducts" className="text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif">
                        <li>
                            ADMIN
                        </li>
                    </Link>
                )}

                {userRole === '1' && (
                    <MenuProfile/>
                )}

                <Link to="/carrito" className="text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif">
                    <li>
                        <img src={carImagen} alt="" className={style.car} />
                    </li>
                </Link>

                {sessionStorage.getItem("token") ? (
                    <div className="text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif">
                        <li>
                            <button className="flex items-center justify-between p-4 font-serif text-xl border-none shadow rounded-xl text-chocolate-blanco bg-chocolate-oscuro hover:shadow-xl shadow-chocolate-oscuro" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </div>
                ) : (
                    <Link to="/login" className="text-2xl list-none text-chocolate-oscuro no-underline pl-3.5  font-serif ">
                        <li>
                            <button className="flex items-center justify-between p-4 font-serif text-xl border-none shadow rounded-xl text-chocolate-blanco bg-chocolate-oscuro hover:shadow-xl shadow-chocolate-oscuro">
                                Login
                            </button>
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    )
}
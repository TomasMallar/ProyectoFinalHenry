import { Link, useHistory } from "react-router-dom"
import style from './NavBar.module.css'
import carImagen from "../../img/shopping-cart.png"
import logo from "../../img/logoBlack.png"

export default function NavBar() {
    const history = useHistory();
    const userRole = sessionStorage.getItem('userRole');
    console.log(userRole)
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userRole");
        history.push("/home");
        window.location.reload();
    };
      
    return (
        <div className={style.container}>
            <div className={style.containerImg}>
                <img src={logo} alt="" className={style.img} />
            </div>
                <ul className={style.containerUlLinks}>
                    <Link to="/home"  className={style.listItem}><li>Home</li> </Link>
                    <Link to="/products" className={style.listItem}><li>Products</li> </Link>
                    <Link to="/about" className={style.listItem}><li>About Us</li> </Link>
                    {userRole === '2' && (
          <Link to="/crudProducts" className={style.listItem}>
            <li>ADMIN</li>
          </Link>
        )}
                    <Link to="/carrito" className={style.listItem}><li> <img src={carImagen} alt="" className={style.car}/></li></Link>
                    {sessionStorage.getItem("token") ? (
                        <div className={` ${style.listItem}`}>

                        <li>
                        <button className={`${style.buttonNav} ${style.listItem}`} onClick={handleLogout}>
                        Logout 
                        </button>
                        </li>
                        </div>

                    ) : (
                    <Link to="/login" className={style.listItem}>
                        <li>
                        <button className={style.buttonNav}>Login</button>
                        </li>
                    </Link>
                    )}
                    {/* <Link to="/createProduct"><li className={style.listItem}> <Button text="Create your Product" /> </li> </Link> */}
                </ul>
        </div>
    )
}
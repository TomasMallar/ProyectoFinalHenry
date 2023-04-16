import { Link } from "react-router-dom"
import style from './NavBar.module.css'
import carImagen from "../../img/shopping-cart.png"
import logo from "../../img/logo.png"
export default function NavBar() {


    return (
        <div className={style.container}>
            <div className={style.containerImg}>
                <img src={logo} alt="" className={style.img} />
            </div>
                <ul className={style.containerUlLinks}>
                    <Link to="/home"  className={style.listItem}><li>Home</li> </Link>
                    <Link to="/products" className={style.listItem}><li>Products</li> </Link>
                    <Link to="/about" className={style.listItem}><li>About Us</li> </Link>
                    <Link to="/crudProducts"  className={style.listItem}><li>ADMIN</li> </Link>
                    <Link to="/carrito" className={style.listItem}><li> <img src={carImagen} alt="" className={style.car}/></li></Link>
                    <Link to="/login" className={style.listItem}><li><button className={style.buttonNav}> Logout  <img src="https://HomePagereferences.my.canva.site/images/3be2725b25654ed759a755525de91b77.svg" alt="" className={style.imgButton}/></button></li></Link>
                    {/* <Link to="/createProduct"><li className={style.listItem}> <Button text="Create your Product" /> </li> </Link> */}
                </ul>
        </div>
    )
}
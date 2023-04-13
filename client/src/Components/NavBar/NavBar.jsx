import { Link } from "react-router-dom"
import style from './NavBar.module.css'
import Button from "../Button/Button"
export default function NavBar() {


    return (
        <div>
            <ul className={style.container}>
                <Link to="/login"><li className={style.listItem}> <Button text="Logout" /> </li></Link>
                <Link to="/home"><li className={style.listItem}> <Button text="home" /> </li> </Link>
                <Link to="/createProduct"><li className={style.listItem}> <Button text="Create your Product" /> </li> </Link>
            </ul>
        </div>
    )
}
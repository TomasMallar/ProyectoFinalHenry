import styles from "./Landing.module.css"
import { Link } from "react-router-dom";
import logo from "../img/logoBlack.png"

export default function Landing() {
    return (
        <div className={styles.container}>
            <div className={styles.containWelcome}>
                <Link to="/products">
                    <img src={logo} alt="" />
                    <h1>Bienvenido a tu chocolateria de confinaza 🍫</h1>
                </Link>

            </div>
        </div>
    )
}
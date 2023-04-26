import styles from "./Landing.module.css"
import FilterBar from "../../Components/Carousel/carousel"
import { Slide, Fade, Rotate } from 'react-reveal';
import { Link } from "react-router-dom";


export default function Landing() {
    return (
        <div className="px-4 font-serif bg-chocolate-blanco">
            <section className=" bg-[url('https://images.unsplash.com/photo-1565071559227-20ab25b7685e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] h-96 bg-cover bg-fixed flex justify-center items-center">

                <Fade top>
                    <h1 className="text-4xl font-bold text-chocolate-blanco ">
                        Bienvenido a tu chocolateria de confinaza 🍫
                    </h1>
                </Fade>
            </section>

            <Fade left>
                <section>
                    <FilterBar />
                </section>
            </Fade>

            <Fade right>
                <section className="flex items-center justify-center py-6">
                    <Slide left>
                        <img src="https://www.cronista.com/files/image/465/465051/62a360d7e2ca7.jpg" alt="" className="w-[40%]" />
                    </Slide>
                    <Slide right>
                        <div className="w-[60]">
                            <h3 className="py-4 text-3xl italic font-bold">
                                90 años
                            </h3>
                            <p className="py-4 text-2xl italic">
                                Nuestra chocolatería argentina cuenta con una trayectoria de más de 90 años en la industria del chocolate, siendo reconocidos por la calidad y artesanía de nuestros productos.
                            </p>
                            <Rotate button left>
                                <button className="p-4 text-xl font-bold shadow-md h-fit shadow-chocolate-claro bg-chocolate-claro rounded-xl text-chocolate-oscuro hover:bg-chocolate-mantecol hover:shadow">
                                    <Link to="/products">
                                    PRUEBALOS YA!
                                    </Link>
                                </button>
                            </Rotate>
                        </div>
                    </Slide>
                </section>
            </Fade>

        </div>
    )
}
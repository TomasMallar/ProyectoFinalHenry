import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getChocolatesById, resetChocolateDetail } from "../../Redux/Actions/Actions"
import Coments from "../../Components/Coments/Coments";
import styles from "./detail.module.css";
import { FaStar } from 'react-icons/fa';
import { useState } from "react";
import axios from 'axios'
import ButtonMP from "../../Components/IntegracionMercadoPago/IntegracionMercadoPago";
import carImagen from "../../img/shopping-cart-cards.png";
import Fade from "react-reveal/Fade";

const Detail = () => {

    const dispatch = useDispatch();
    const { id } = useParams(); //takes the id form the url as it is a parameter given in the link
    //Selects from the global state only the characterDetail property
    const ChocolateDetail = useSelector((state) => state.chocolateDetail)
    const [totalVal, setTotalVal] = useState(null)
    useEffect(async() => {
        dispatch(getChocolatesById(id));
        const chocolateScore = await axios.get(`http://localhost:3001/score/${id}`)
        setTotalVal(chocolateScore.data.cont)
        return () =>
            dispatch(resetChocolateDetail())
    }, [dispatch, id])

    // PUNTUACION
    const [rating, setRating] = useState(null);
    const handleClick = async (value) => {
        const response = await axios.put(`http://localhost:3001/score/${id}`, { score: value })
        setTotalVal(response.data.score.cont)
        setRating(value)
    }
    
    // carrito 
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        console.log('ESTE ES EL PRODUCTO ARMADO', product);
        setCartItems((prevCartItems) => {
            const existingProduct = prevCartItems.find(item => item.id === product.id);
            console.log('ESTE ES EL PRODUCTO EXISTENTE', existingProduct);

            if (existingProduct) {
                // Si el producto ya existe, actualizar su cantidad sumando 1
                const updatedCartItems = prevCartItems.map(item => {
                    if (item.id === product.id) {
                        console.log('LLEGAMOS AL MAS?');
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
                console.log('ESTE ES EL CARRITO ACTUALIZADO', updatedCartItems);
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
                return updatedCartItems;
            } else {
                // Si el producto no existe, agregarlo con una cantidad de 1
                const updatedCartItems = [...prevCartItems, { ...product, quantity: 1 }];
                localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
                return updatedCartItems;
            }
        });
    };

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);

    // carrito 

    function goBack() {
        window.history.back();
    }


    return (
        <div className="w-full h-full font-serif p-9 bg-chocolate-blanco">
            <Fade cascade>

                {/* container del detail */}
                <div className="w-full h-full rounded-lg p-9 bg-chocolate-mantecol">
                    {/* seccion del producto  */}
                    <section className="flex items-center justify-between">

                        <div className="w-[50%] flex justify-between">
                            <button className="flex items-center justify-center p-2 border-none shadow-lg w-fit h-fit bg-chocolate-oscuro text-chocolate-blanco rounded-2xl shadow-chocolate-bombom hover:bg-chocolate-bombom" onClick={goBack}>
                                <img src="https://res.cloudinary.com/dsaocvav7/image/upload/v1681707019/arrow_zxesaq.png" alt="" className="w-5 mr-4 invert " />
                                Volver
                            </button>
                            <div className="w-[80%] h-[100%]  bg-chocolate-bombom p-3 rounded-lg">
                                <img className="w-[488px] h-[489px] rounded-lg" src={ChocolateDetail.image} alt={ChocolateDetail.name} />
                            </div>
                        </div>

                        <div className="w-[50%] flex flex-col">
                            <h1 className="p-2 m-2 text-4xl font-bold basis-full">
                                {ChocolateDetail.name}
                            </h1>
                            <h3 className="p-2 m-2 text-2xl font-semibold basis-full">
                                $ {ChocolateDetail.price}
                            </h3>

                            <div className="flex flex-row px-5 my-6">
                                <div className="flex flex-col items-start justify-start px-5 basis-1/2">
                                    <p className="px-2 text-xl font-semibold ">
                                        Categorias
                                    </p>
                                    {ChocolateDetail.categories?.map((c) => {
                                        return (
                                            <p key={c} className="p-2 text-lg">
                                                - {c}
                                            </p>
                                        )
                                    })}
                                </div>
                                <div className="flex flex-col items-start justify-start px-5 basis-1/2">
                                    <p className="px-2 text-xl font-semibold">
                                        Ingredientes
                                    </p>
                                    {ChocolateDetail.ingredients?.map((c) => {
                                        return (
                                            <p key={c} className="p-2 text-lg">
                                                - {c}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-row items-center">
                                <p className="text-xl font-semibold basis-1/3">
                                    Stock: {ChocolateDetail.stock}
                                </p>
                                <div className="basis-1/3">
                                    <ButtonMP title={ChocolateDetail.name} unit_price={ChocolateDetail.price} />
                                </div>
                                <button className="p-1 m-2 font-serif font-bold rounded-lg shadow-sm bg-chocolate-claro text-chocolate-oscuro shadow-chocolate-claro hover:bg-chocolate-blanco basis-1/3" onClick={() => addToCart(ChocolateDetail)}>
                                    AGREGAR AL CARRO
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* seccion de valoraciones */}
                    <section className="flex items-start justify-center">
                        <div className="pt-8 w-[30%]">
                            <h3 className="mb-8 text-3xl ">VALORACIONES</h3>
                            <div className={styles.rating}>
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;

                                    return (
                                        <label key={i}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => handleClick(ratingValue)}
                                            />
                                            <FaStar
                                                size={25}
                                                color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                                                style={{ marginRight: '5px', cursor: 'pointer', marginBottom: '15px' }}

                                            />
                                        </label>
                                    );
                                })}
                            </div>
                            <div className={styles.rating}>
                                <h2 className="mb-8 text-3xl ">Promedio de valoraciones</h2>
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;

                                    return (
                                        <label key={i}>
                                            <FaStar
                                                size={25}
                                                color={ratingValue <= ChocolateDetail.score ? '#ffc107' : '#e4e5e9'}
                                                style={{ marginRight: '5px', cursor: 'pointer', marginBottom: '15px' }}
                                            />
                                        </label>
                                    );
                                })}
                                <h3>{totalVal} calificaciones</h3>
                            </div>
                        </div>
                        <div className="w-[70%] pt-20">
                            <Coments></Coments>
                        </div>
                    </section>

                </div>
            </Fade>
        </div>
    )
}

export default Detail
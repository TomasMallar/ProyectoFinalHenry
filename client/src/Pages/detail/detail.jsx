import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getChocolatesById, resetChocolateDetail } from "../../Redux/Actions/Actions"
import Coments from "../../Components/Coments/Coments";
import styles from "./detail.module.css";
import { FaStar } from 'react-icons/fa';
import { useState } from "react";
import axios from 'axios'

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); //takes the id form the url as it is a parameter given in the link
    //Selects from the global state only the characterDetail property
    const ChocolateDetail = useSelector((state) => state.chocolateDetail)
    useEffect(() => {
        dispatch(getChocolatesById(id));
        return () =>
            dispatch(resetChocolateDetail())
    }, [dispatch, id])

    // PUNTUACION
    const [rating, setRating] = useState(null);

    const handleClick = async (value) => {
        const response = await axios.put(`http://localhost:3001/score/${id}`, { score: value })
        setRating(value)
    }

    return (
        <div className="p-12 font-serif bg-chocolate-blanco">
            <div>
                <div className="w-fit">
                    <Link to={`/products`} className="w-fit">
                        <button className="flex items-center justify-center p-2 border-none shadow-lg w-fit h-fit bg-chocolate-oscuro text-chocolate-blanco rounded-2xl shadow-chocolate-bombom hover:bg-chocolate-mantecol hover:text-chocolate-oscuro">

                            <img src="https://res.cloudinary.com/dsaocvav7/image/upload/v1681707019/arrow_zxesaq.png" alt="" className="w-5 mr-4 " />

                            Volver
                        </button>
                    </Link>
                </div>
                <br />
                <div className="border-8 border-chocolate-mantecol w-[40%] h-[70%] my-0 mx-auto rounded-2xl bg-chocolate-oscuro shadow-lg shadow-chocolate-bombom text-chocolate-blanco ">
                    <img className="mx-auto mt-8 w-80 h-80" src={ChocolateDetail.image} alt={ChocolateDetail.name} />
                    <h1 className="p-2 m-2 text-xl">{ChocolateDetail.name}</h1>
                    <div> {ChocolateDetail.categories?.map((c) => {
                        return <p key={c} className="p-2 m-2 text-lg">{c}</p>
                    })} </div>
                    <h3 className="p-2 m-2">$ {ChocolateDetail.price} </h3>

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
                </div>
                <br />
                <Coments></Coments>
            </div>
        </div>
    )
}

export default Detail
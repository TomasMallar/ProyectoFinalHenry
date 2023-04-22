import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getChocolatesById, resetChocolateDetail } from "../../Redux/Actions/Actions"
import styles from "./detail.module.css"

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
    return (
        <div className={styles.container}>
            <div className={styles.containerLink}>
                <Link to={`/products`} className={styles.links}>
                    <button className={styles.returnButtom}>
                        <img src="https://res.cloudinary.com/dsaocvav7/image/upload/v1681707019/arrow_zxesaq.png" alt="" />
                        Volver
                    </button>
                </Link>
            </div>
            <br />
            <div className={styles.containerCard}>
                <img className={styles.pictures} src={ChocolateDetail.image} alt={ChocolateDetail.name} />
                <h1 className={styles.titleDetail}>{ChocolateDetail.name}</h1>
                <div> {ChocolateDetail.categories?.map((c) => {
                    return <p key={c}>{c}</p>
                })} </div>
                <h3>$ {ChocolateDetail.price} </h3>
            </div>
        </div>
    )
}

export default Detail
import style from "./carouselCard.module.css"
const CarouselCard = ({id, name, image, price, category}) => {
    return (
        <div className={style.container} key={id}>
            <div className={style.carousel} >
            <div className={style.item}>
            <div className={style.pictures}>
                <img src={image} alt={name} className={style.pictures}/>
            </div>
            <div className={style.info}>
                <span className="name"> {name} </span>
                <span className="category"> {category?.map((c)=>{
                    return <p key={c}>{c}</p>
                
                })} </span>
                <span className="price">$ {price}</span>
            </div>
            </div>
            </div>
            
        </div>
    )
}

export default CarouselCard
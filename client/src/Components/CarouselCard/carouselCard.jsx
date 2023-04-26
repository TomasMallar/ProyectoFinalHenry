import style from "./carouselCard.module.css"
const CarouselCard = ({ id, name, image }) => {
    return (
        <div className="flex flex-col bg-chocolate-oscuro w-72 h-72" key={id}>
            <h3 className="font-serif font-bold text-lg text-chocolate-blanco h-[10%]"> {name} </h3>
            <img src={image} alt={name} className="h-[90%] w-full " />
        </div>
    )
}

export default CarouselCard
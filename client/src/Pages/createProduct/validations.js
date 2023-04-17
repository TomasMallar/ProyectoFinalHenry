

export default function Validations({ name, price, stock, image, types, categories, ingredients }) {
    const regexName = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/
    const regexUrl = /^(ftp|http|https):\/\/[^ "]+$/

    let objErrors = {}

    if (!name) {
        objErrors.name = "Debe ingresar el nombre del producto"
    } else if (!regexName.test(name)) {
        objErrors.name = "El nombre no puede tener caracteres especiales"
    }
    if (!price) {
        objErrors.price = "Debe ingresar el precio del producto"
    } else if (Number(price) < 0) {
        objErrors.price = "Debe ingresar un precio mayor que 0"
    }
    if (!stock) {
        objErrors.stock = "Debe ingresar el stock del producto"
    } else if (Number(stock) < 0) {
        objErrors.stock = "Debe ingresar un stock mayor que 0"
    }
    if (!image) {
        objErrors.image = "Debe ingresar una url de la imágen"
    } else if (!regexUrl.test(image)) {
        objErrors.image = "Ingrese una url válida"
    }
    if (!types.length) {
        objErrors.types = "Debe elegir al menos un tipo"
    }

    if (!categories.length) {
        objErrors.categories = "Debe elegir al menos una categoría"
    }
    if (!ingredients.length) {
        objErrors.ingredients = "Debe elegir al menos un ingrediente"
    }
    return objErrors
}
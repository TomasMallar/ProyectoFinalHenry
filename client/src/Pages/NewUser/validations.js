
export default function Validations({ name, surname, date_of_birth, mail, phone, password, favorites_tastes }) {

    let objErrors = {}
    const regexName = /^([A-Za-zÁÉÍÓÚÑáéíóúñ]+[\s]?)+$/ //mayusculas minusculas acentos y nombres compuestos se aceptan 
    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ //verifica arroba, largo y permite caracteres especiales 
    const regexPhone = /^\d{10}$/ // verifica numeros argentinos 
    const regexPassword = {
        regexMayus: /(?=.*[A-Z])/,
        regexCSpecial: /(?=.*[^a-zA-Z0-9])./,
        regexLenght: /(?=.{8,})/
    } // verifica contraseña con al menos una mayuscula, caracter especial y largo de 8 

    if (!name) {
        objErrors.name = "Debe ingresar su nombre"
    } else if (!regexName.test(name)) {
        objErrors.name = "Ingrese un nombre válido"
    }
    if (!surname) {
        objErrors.surname = "Debe ingresar su apellido"
    } else if (!regexName.test(surname)) {
        objErrors.surname = "Ingrese un apellido válido"
    }
    if (!date_of_birth) {
        objErrors.date_of_birth = "Ingrese su fecha de nacimiento"
    }

    if (!mail) {
        objErrors.mail = "Debe ingresar su mail"
    } else if (!regexMail.test(mail)) {
        objErrors.mail = "Ingrese un mail válido"
    }
    if (!phone) {
        objErrors.phone = "Debe ingresar su celular"
    } else if (!regexPhone.test(phone)) {
        objErrors.phone = "Ingrese un celular con el \n codigo de area seguido de su número "
    }
    if (!password) {
        objErrors.password = "Debe elegir una contraseña"
    } else if (!regexPassword.regexMayus.test(password)) {
        objErrors.password = "Debe tener al menos una letra mayúscula"
    } else if (!regexPassword.regexCSpecial.test(password)) {
        objErrors.password = "Debe tener al menos un carácter especial"
    } else if (!regexPassword.regexLenght.test(password)) {
        objErrors.password = "Debe tener una longitud mínima de 8 caracteres"
    }
    // if (!favorites_tastes?.length) {
    //     objErrors.favorites_tastes = "Elija al menos uno de sus chocolates favoritos"
    // }
    return objErrors
}


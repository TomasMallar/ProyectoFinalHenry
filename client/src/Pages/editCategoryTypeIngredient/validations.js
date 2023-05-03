
export default function Validations (element) {
    console.log(element, "soy element")
    let objErrors = ""
    const regex = /^[a-zA-Z0-9 ]*$/;

if (!regex.test(element)) {
    objErrors = "Ingrese un ingrediente válido"
}
return objErrors
}

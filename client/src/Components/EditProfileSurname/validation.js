const validation = (data) => {
  let objErrors = {}
  const regexName = /^([A-Za-zÁÉÍÓÚÑáéíóúñ]+[\s]?)+$/ //mayusculas minusculas acentos y nombres compuestos se aceptan 
  const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ //verifica arroba, largo y permite caracteres especiales 
  const regexPhone = /^\d{10}$/ // verifica numeros argentinos 

    if (!regexName.test(data.name)) {
        objErrors.name = "Ingrese un nombre válido"
    }

    if (!regexName.test(data.surname)) {
        objErrors.surname = "Ingrese un apellido válido"
    }

    if (!data.date_of_birth) {
        objErrors.date_of_birth = "Ingrese su fecha de nacimiento"
    }

    if (!regexMail.test(data.mail)) {
        objErrors.mail = "Ingrese un mail válido"
    }

    if (!regexPhone.test(data.phone)) {
        objErrors.phone = "Ingrese un celular válido con el formato codigo de area seguido de su número "
    }

  return objErrors;
};

export default validation;

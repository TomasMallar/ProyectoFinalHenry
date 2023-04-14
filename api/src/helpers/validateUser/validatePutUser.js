const Joi = require("joi")

const validatePutUser = (data) => {
    try {

        if(!Object.keys(data).length) {
            throw new Error("You must provide at least one piece of information to update");
        }

        const schema = Joi.object({
            name: Joi.string().optional(),
            surname: Joi.string().optional(),
            mail: Joi.string().optional(),
            date_of_birth: Joi.string().optional(),
            password: Joi.string().optional(),
            phone: Joi.number().optional()
        });

        const validation = schema.validate(data);

        if (validation.error) {
            throw new Error(validation.error.message);
        }

        const updateData = validation.value;

        return updateData;

    } catch (error) {
        throw new Error(error.message);
    }
}



// const validatePutUser = (data) => {
//     try {
//         const { name, surname, mail, date_of_birth, password, phone } = data;
//         const errorDataType = "is not the expected data type";

//         if (
//             typeof name === "undefined" && 
//             typeof surname === "undefined" && 
//             typeof mail === "undefined" && 
//             typeof date_of_birth === "undefined" && 
//             typeof password === "undefined" && 
//             typeof phone === "undefined") {

//             throw new Error("You must provide at least one piece of information to update");
//         }

//         if(typeof name !== "string") throw new Error(`Name ${errorDataType}`);
//         if(typeof surname !== "string") throw new Error(`Surname ${errorDataType}`);
//         if(typeof mail !== "string") throw new Error(`Mail ${errorDataType}`);
//         if(typeof password !== "string") throw new Error(`Password ${errorDataType}`);
//         if(typeof date_of_birth !== "string") throw new Error(`Date og birthday ${errorDataType}`);
//         if(typeof phone !== "number") throw new Error(`Phone ${errorDataType}`);

//         const updateData = {};
        
//         if(name) updateData.name = name;
//         if(surname) updateData.surname = surname
//         if(mail) updateData.mail = mail;
//         if(password) updateData.password = password;
//         if(phone) updateData.phone = phone;
//         if(date_of_birth) updateData.date_of_birth = date_of_birth;

//         return updateData;

//     } catch (error) {
//         throw new Error(error.message);
//     }
    
// }   

module.exports = validatePutUser;
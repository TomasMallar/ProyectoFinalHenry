const Joi = require("joi")

const validatePutUser = (data) => {
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
}

module.exports = validatePutUser;
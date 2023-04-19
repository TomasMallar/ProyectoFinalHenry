const Joi = require("joi")

const validatePutUser = (req, res, next) => {
    if(!Object.keys(req.body).length) {
        throw new Error("You must provide at least one piece of information to update");
    }
    console.log(req.body);

    const schema = Joi.object({
        name: Joi.string().allow("").optional(),
        surname: Joi.string().allow("").optional(),
        mail: Joi.string().optional(),
        date_of_birth: Joi.string().optional(),
        password: Joi.string().optional(),
        phone: Joi.number().optional(),
      });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
}

module.exports = validatePutUser;
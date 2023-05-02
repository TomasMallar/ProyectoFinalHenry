const Joi = require('joi');

const validatePostRegister = (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().allow("").optional(),
        surname: Joi.string().allow("").optional(),
        mail: Joi.string().required(),
        date_of_birth: Joi.string().required(),
        password: Joi.string().required(),
        phone: Joi.number().required(),
        image: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = validatePostRegister;
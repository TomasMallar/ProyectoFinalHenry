const Joi = require("joi")

const validateMail = (req, res, next) => {
    const schema = Joi.object().keys({
        mail: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
}

module.exports = validateMail;
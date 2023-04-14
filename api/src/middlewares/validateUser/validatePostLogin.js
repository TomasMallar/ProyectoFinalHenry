const Joi = require('joi');

const validatePostLogin = (req, res, next) => {
    const schema = Joi.object().keys({
        mail: Joi.string().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = validatePostLogin;
const Joi = require('joi');

const schema = Joi.object({
    nid: Joi.string().min(4).max(11).required(),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'org', 'net'],
            },
        })
        .min(5)
        .max(150)
        .required(),

    firstName: Joi.string().alphanum().min(3).max(15).required(),

    lastName: Joi.string().alphanum().min(3).max(15).required(),

    password: Joi.string().min(4).required(),

    confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('confirmPassword')
        .options({
            messages: {
                'any.only': '{{#label}} does not match',
            },
        }),
});

/**
 * Registration user schema validator.
 * @param {Object} data The object which client sent.
 * @returns {Object} The result object validated by joi.
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};

const Joi = require('joi');

const schema = Joi.object({
    oldPassword: Joi.string().min(4).required(),
    newPassword: Joi.string().min(4).required(),
    confirmPassword: Joi.any()
        .equal(Joi.ref('newPassword'))
        .required()
        .label('confirmPassword')
        .options({
            messages: {
                'any.only': '{{#label}} does not match',
            },
        }),
});

/**
 * forget password schema validator
 * @param {Object} data The object which client sent
 * @returns {Object} The result object validated by joi
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};

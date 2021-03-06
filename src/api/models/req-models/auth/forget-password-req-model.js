const Joi = require('joi');

const schema = Joi.object({
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

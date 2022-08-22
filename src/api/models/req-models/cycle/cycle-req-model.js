const Joi = require('joi');

const schema = Joi.object({
    cycleNumber: Joi.string().required(),
    model: Joi.string().required(),
    hubId: Joi.string().required(),
});

/**
 * cycle create schema validator
 * @param {Object} data the object which client sent
 * @returns {Object} the result object validated by joi
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};

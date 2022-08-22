const Joi = require('joi');

const schema = Joi.object({
    cycleNumber: Joi.string(),
    ridingStatus: Joi.bool(),
    model: Joi.string(),
    hubId: Joi.string(),
});

/**
 * cycle update schema validator
 * @param {Object} data the object which client sent
 * @returns {Object} the result object validated by joi
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};

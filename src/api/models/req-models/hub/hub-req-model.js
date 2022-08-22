const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
});

/**
 * hub schema validator
 * @param {Object} data the object which client sent
 * @returns {Object} the result object validated by joi
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};

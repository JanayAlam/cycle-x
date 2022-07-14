const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    dob: Joi.date().raw(),
});

/**
 * registration user schema validator.
 * @param {Object} data the object which client sent.
 * @returns {Object} the result object validated by joi.
 */
module.exports = (data) => {
    const result = schema.validate(data);
    result.value = data;
    return result;
};

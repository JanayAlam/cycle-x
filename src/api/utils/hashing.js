const bcrypt = require('bcrypt');
const {InternalServerError} = require("../errors/apiErrors");

/**
 * Hash a string
 * @param {string} str the string value that will be hashed
 * @returns {Promise} hashed value
 */
const generateHash = async (str) => {
    let saltValue = 10;
    try {
        if (process.env.SALT) {
            saltValue = Number(process.env.SALT);
        }
    } catch (err) {
        console.log(err)
        throw new InternalServerError('Salt number conversion error')
    }
    const salt = await bcrypt.genSalt(saltValue);

    return bcrypt.hash(str, salt);
};

/**
 * Compare a string to a hashed string
 * @param {string} str normal string value to compare
 * @param {string} hashedString hashed string value
 * @returns {Promise} boolean value
 */
const compareHashedString = (str, hashedString) => {
    return bcrypt.compare(str, hashedString);
};

module.exports = {
    generateHash,
    compareHashedString,
};

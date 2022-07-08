const { BadRequestError } = require('../errors/apiErrors');
const UserService = require('./UserService');
const { generateHash } = require('../utils/hashing');

class AuthService {
    static register() {
        // TODO
    }

    static login(email, password) {
        // TODO
    }
}

module.exports = AuthService;

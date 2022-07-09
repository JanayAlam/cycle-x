class ApiError extends Error {
    /**
     * Constructor of ApiError Class.
     * @param message
     */
    constructor(message) {
        super();
        this.message = message;
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 500;
}

class BadRequestError extends ApiError {
    /**
     * Error class for bad request error
     * @param message
     */
    constructor(message = 'Some fields are required') {
        super(message);
        this.name = 'BadRequestError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 400;
}

class AuthenticationError extends ApiError {
    /**
     * Error class for authentication error.
     * @param message
     */
    constructor(message = 'Invalid credentials') {
        super(message);
        this.name = 'AuthenticationError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 401;
}

class UnAuthorizationError extends ApiError {
    /**
     * Error class for un-authorization error.
     * @param message
     */
    constructor(message = 'User need to be authorized') {
        super(message);
        this.name = 'UnAuthorizeError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 403;
}

class NotFoundError extends ApiError {
    /**
     * Error class for not found error.
     * @param message
     */
    constructor(message = 'Requested data not found') {
        super(message);
        this.name = 'NotFoundError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 404;
}

class ConflictError extends ApiError {
    /**
     * Error class for already exists things.
     * @param message
     */
    constructor(message = 'The data is already exist') {
        super(message);
        this.name = 'ConflictError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 409;
}

class NotAcceptableError extends ApiError {
    /**
     * Error class for not acceptable request.
     * @param message
     */
    constructor(message = 'The request is not acceptable') {
        super(message);
        this.name = 'NotAcceptableError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 406;
}

class InternalServerError extends ApiError {
    /**
     * Error class for not acceptable request.
     * @param message
     */
    constructor(message = 'Something went wrong') {
        super(message);
        this.name = 'InternalServerError';
    }

    /**
     * Get error status code.
     * @returns {int} Status code of the error.
     */
    getCode = () => 500;
}

module.exports = {
    ApiError,
    BadRequestError,
    UnAuthorizationError,
    AuthenticationError,
    NotFoundError,
    ConflictError,
    NotAcceptableError,
    InternalServerError,
};

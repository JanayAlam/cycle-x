const { ApiError, InternalServerError, NotFoundError } = require('./apiErrors');

module.exports = (app) => {
    app.use((_req, _res, next) => {
        next(new NotFoundError('Requested URL is not valid'));
    });

    app.use((err, _req, res, _next) => {
        // assuming the error status code is 500
        let code = 500;
        // checking if the error is known or unknown
        if (err instanceof ApiError) {
            // getting the actual error code
            code = err.getCode();
        } else {
            // error is unhandled.
            err = new InternalServerError(
                err.message || 'Something went wrong'
            );
        }
        // returning the error message
        return res.status(code).json({
            name: err.name,
            message: err.message,
        });
    });
};

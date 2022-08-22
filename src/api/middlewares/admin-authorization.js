const { UnAuthorizationError } = require('../errors/apiErrors');

module.exports = (req, _res, next) => {
    const user = req.user;
    if (user.roles.includes('ADMIN')) {
        return next();
    } else {
        throw new UnAuthorizationError('You are not authorized to this route');
    }
}
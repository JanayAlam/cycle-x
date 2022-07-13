const passport = require('passport');
const passportJWT = require('passport-jwt');
const { user: userService } = require('../services/index');

// some variables
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
// the secret key
const secretKey = process.env.SECRET_KEY;

// the passport jwt strategy options
let JWTOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
}


module.exports = () => {
    // configuring the passport js.
    passport.use(new JwtStrategy(JWTOptions, function (JWTPayload, done) {
        // finding the user from the database
        userService.findByProperty('id', JWTPayload.userId)
            .then(user => done(null, user))
            .catch(err => done(err, false));
    }));
}

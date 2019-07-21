const passport = require('passport'),
    passport_jwt = require('passport-jwt'),
    JwtStrategy = passport_jwt.Strategy,
    ExtractJwt = passport_jwt.ExtractJwt,
    config = require('../config/app.config')

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret
passport.use(new JwtStrategy(opts, (payload, done) => {
    done(null, payload._id)
}))

module.exports = passport
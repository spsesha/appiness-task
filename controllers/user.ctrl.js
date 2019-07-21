const User = require('../db/schemas/users.db'),
    jwt = require('jsonwebtoken'),
    config = require('../config/app.config')

module.exports.signup = (req, res, next) => {
    let body = req.body
    User.findOne({email: req.body.email}).select(['-budget', '-expenses', '-categories']) .exec((err, data) => {
        if (err) return next(err)
        if (data) return res.status(409).json({ message: 'User already exists' })
        let user = new User()
        user.name = body.name
        user.email = body.email
        user.password = body.password
        user.budget = 0
        user.save((err) => {
            if(err) return next(err)
            res.status(200).json({ message: 'User created successfully '})
        })
    })
}

module.exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}).select(['-budget', '-expenses', '-categories']).exec((err, user)=> {
        if (err) return next(err)
        if (!user) return res.status(401).json({ message: 'Invalid username' })
        user.compareHash(req.body.password, (err, isMatch) => {
            if (err) return next(err)
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })
            let json = user.toJSON()
            let token = jwt.sign(json, config.jwtSecret, { expiresIn: 604800 })
            res.status(200).json({
                token: token,
                user: user.toJSON()
            })
        })
    })
}
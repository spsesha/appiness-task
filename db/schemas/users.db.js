const mongoose = require('mongoose'),
    Schema = mongoose.Schema
    bcrypt = require('bcryptjs'),
    saltRounds = 10

let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    expenses: [{
        _id: { type: mongoose.SchemaTypes.ObjectId, auto: true, index: true },
        category: { type: String },
        name: { type: String },
        amount: { type: Number },
        createdAt: { type: Date },
        isDeleted: { type: Boolean, default: false }
    }],
    budget: { type: Number },
    categories: [String]
})

userSchema.methods.toJSON = function() {
    let user = this.toObject()
    delete user.password
    return user
}

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) return next(err)
        this.password = hash
        next()
    })
})

userSchema.methods.compareHash = function(password, cb) {
    bcrypt.compare(password, this.password, (err, res) => {
        return cb(err, res)
    })
}

module.exports = mongoose.model('Users', userSchema)
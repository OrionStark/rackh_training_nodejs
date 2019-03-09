let mongoose = require('mongoose')
let validator = require('validator')

let userSchema = new mongoose.Schema({
    username: String,
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})

userSchema.statics = {
    getFriends(user_id) {
        console.log(user_id)
        return new Promise((resolve, reject) => {
            this.find({_id: user_id})
                .populate("friends")
                .exec()
                .then(docs => {
                    resolve(docs)
                })
                .catch(err => {
                    return reject(err)
                })
        })
    }
}

userSchema.pre('validate', (next) => {
    const currentTime = new Date()
    if ( !this.createdAt ) { this.createdAt = currentTime }
    this.updatedAt = currentTime
    next()
})

module.exports = mongoose.model('User', userSchema)
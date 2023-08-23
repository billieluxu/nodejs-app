const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 250,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;
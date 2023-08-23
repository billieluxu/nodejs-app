const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// get details from json web token rather than passing it in header or body of the http request
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/', async (req, res)=>{

    const salt  = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed
    });

    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send({
        name: user.name,
        email: user.email
    });
 });

 module.exports = router;

const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/', async (req, res)=>{
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("user not found");

    const salt  = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.passwor, salt);

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();

    res.send(token);
 });

 module.exports = router;

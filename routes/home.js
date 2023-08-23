const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, name: 'course 1'}, 
    {id:2, name: 'course 2'}
];

router.get('/', (req, res) => {
    res.render('index.pug', {title: 'express', message: "Hello"});
});

module.exports = router;
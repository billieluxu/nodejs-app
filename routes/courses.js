const express = require('express');
const router = express.Router();
const Joi = require('joi'); 
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const courses = [
    {id: 1, name: 'course 1'}, 
    {id:2, name: 'course 2'}
];

router.get('/', (req, res)=>{
    res.send(courses); 
 });

 router.get('/:id', (req, res)=>{
   let course = courses.find(c => c.id === parseInt(req.params.id)); 
   if (!course)
    res.status(404).send("the course is not found");

    res.send(course);
});

// auth is going to be executed before async (req, res)
router.post('/', auth, async (req, res) =>{
    // const schema ={
    //     name: Joi.string.min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);


    // if(result.error){
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    //}

    const course = {
        id: courses.length+1,
        name: req.body.name // assuming there's a name property in requst body
    };

    courses.push(course);

    res.send(course);
});

router.put('/:id', (req, res) => {
    let course = courses.map(c => c.id === parseInt(req.params.id));

    if(!course) res.status(404).send("course does not exist");

    const {error} = validateCourse(req.body);

    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name=req.body.name;

    res.send(course);
});

router.delete('/:id', admin, async(req, res) =>{
    
});

function validateCourse (course) {
    const schema ={
        name: Joi.string.min(3).required()
    };

    const result = Joi.validate(course, schema);

    return result;
}

module.exports = router;
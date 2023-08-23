const express = require('express');
const logger = require('./middleware/logger');
const config = require('config');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');


// need to set: export DEBUG=app:db
dbDebugger("Connected to the database ... ");

const app = express();
app.use(express.json());
app.use(logger);

// API Endpoints
app.use('/api/courses', courses);
app.use('/', home);
app.use('/api/users', users);
app.use('/api/auth', auth);


app.set('view engine', 'pug');
app.set('views', './views');

//configuration, after setting: export NODE_ENV = development/production
//console.log(`Application name: ${config.get('name')}`)
//console.log(`Mail server name: ${config.get('mail.host')}`)
//console.log(`Mail password: ${config.get('mail.password')}`)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => console.log("Could not connect to MongoDB" + err.message));

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: "Node.js course",
        author: "Billie",
        tags: ['node', 'backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

createCourse();

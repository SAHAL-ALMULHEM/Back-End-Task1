//import libraries

const express = require('express');
const fs = require('fs');

const task = express(); // save anything in express on task file
const port = 3000; // creat port for localhost


task.use(express.json()); // creat md ware

// function for red data from json file

const readData = () => {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data)
}

// get all

task.get('/users', (req, res) => {
    const data = readData();
    res.json(data)
})

task.listen(port, function() {
    console.log('my server is runnig here: http://localhost:3000');
});

// getById

task.get('/users/:id', (req, res) => {
    const data = readData();
    const user = data.find(u => u.id == parseInt(req.params.id));
    if (!user) return res.status(404).json({error: 'user not found'});
    res.json(user)
})

task.get('/users/age/:age', (req, res) => {
    const data = readData();
    const usersByAge = data.find(u => u.age == parseInt(req.params.age));
    if (!usersByAge) return res.status(404).json({error: 'user not found'});
    res.json(usersByAge)
});

task.get('/users/hobby/:hobby', (req, res) => {
    const hobby = req.params.hobby.toLowerCase(); // Convert hobby to lowercase for case-insensitive comparison
    const data = readData();
    const usersByHobby = data.filter(u => 
        u.hobbies && u.hobbies.map(h => h.toLowerCase()).includes(hobby)
    );
    if (usersByHobby.length === 0) return res.status(404).json({ error: 'user not found' });
    res.json(usersByHobby);
});
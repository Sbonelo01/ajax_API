"use strict"

const {
    addNewVisitor,
    listAllVisitors,
    deleteVisitor
} = require('../src/app');
const port = 3000;
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(urlencodedParser)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.post('/submit-form', async(req, res) => {
    const visitorName = req.body.visitorName
    const assistant = req.body.assisitant
    const visitorAge = req.body.visitorAge
    const dateOfVisit = req.body.dateOfVisit
    const timeOfVisit = req.body.timeOfVisit
    const comments = req.body.comments
    const id = await addNewVisitor(visitorName, assistant, age, dateOfVisit, timeOfVisit, comments);
    res.render("index", {
        visitorsName: req.body.visitorName,
        nameOfAssistant: req.body.assistant,
        age: req.body.visitorAge,
        dateOfVisit: req.body.dateOfVisit,
        timeOfVisit: req.body.timeOfVisit,
        comments: req.body.comments,
        id: id
    });
    res.end()
})

app.get('/viewVisitors', async(req, res) => {
    const visitor = await listAllVisitors();
    res.send(JSON.stringify(visitor));
    res.end();
})

const server = app.listen({
    port
}, () => {
    console.log(`Server is running on port ${port}`)
})

module.exports = {
    server
}

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

app.use(urlencodedParser);
app.use('/', express.static(__dirname));
app.get("/single-page-app", express.static(__dirname));

app.get('/single-page-app', (req, res) => {
    return res.sendFile(`index.html`)
})

app.post('/submit-form', async(req, res) => {
    let visitorName = req.body.visitorName
    let assistant = req.body.assisitant
    let visitorAge = req.body.visitorAge
    let dateOfVisit = req.body.dateOfVisit
    let timeOfVisit = req.body.timeOfVisit
    let comments = req.body.comments
    let visitor = await addNewVisitor(visitorName, assistant, age, dateOfVisit, timeOfVisit, comments);
    res.render("index", {
        visitorsName: req.body.visitorName,
        assistant: req.body.assistant,
        age: req.body.visitorAge,
        dateOfVisit: req.body.dateOfVisit,
        timeOfVisit: req.body.timeOfVisit,
        comments: req.body.comments,
        id: id
    });
    res.end()
})

//res.status(200).json({ status: 'ok', visitor: vistor[0]});

app.delete('/delete-visitor/:id', async (req, res) => {
    const id = req.params.id;
    const visitor = await deleteVisitor(id);
    res.status(200).json({ status: 'ok', visitor: vistor[0]});
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

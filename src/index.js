"use strict"

const {
    addNewVisitor,
    updateVisitor,
    deleteVisitor,
    deleteVisitors,
    viewVisitors,
    viewVisitor
} = require('./app');

const port = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const {
    request
} = require('http');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(cors());
app.use(bodyParser.json());
app.use(urlencodedParser);
app.use('/', express.static('public'));


app.get('/single-page-app', (request, response) => {
    return response.status(200).sendFile(__dirname + '/public/index.html')
})

app.post('/add-new-visitor', async (request, response) => {
    let visitorName = request.body.visitorName
    let assistant = request.body.assistant
    let visitorAge = request.body.visitorAge
    let dateOfVisit = request.body.dateOfVisit
    let timeOfVisit = request.body.timeOfVisit
    let comments = request.body.comments

    const visitor = await addNewVisitor(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments);
 
    response.status(200).json({
        status: 'ok',
        visitor: visitor[0]
    });
    //response.end();
});

// Delete visitor
app.delete('/delete-visitor/:id', async (request, response) => {
    const id = request.params.id;
    const visitor = await deleteVisitor(id);
    response.status(200).json({ 
        status: 'ok',
        visitor: visitor[0] 
    });
});

// View visitors
app.get('/view-visitors', async (request, response) => { 
    const visitors = await viewVisitors();
    response.status(200).json({ 
        status: 'ok',
        visitors: visitors
    });
});

const server = app.listen({port}, () => {
    console.log(`Server is running on port ${port}`)
});

module.exports = {
    server
}

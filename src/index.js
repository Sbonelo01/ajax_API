"use strict"

const {
    addNewVisitor,
    listAllVisitors,
    deleteVisitor,
    deleteAll,
    addContent
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

app.post('/submit-form', async (request, response) => {
    const visitorName = request.body.visitorName
    const assistant = request.body.assistant
    const visitorAge = request.body.visitorAge
    const dateOfVisit = request.body.dateOfVisit
    const timeOfVisit = request.body.timeOfVisit
    const comments = request.body.comments
    const id = await addNewVisitor(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments);
    res.render("index", { visitorName: request.body.visitorName,
                        nameOfAssistant: request.body.assistant,
                        visitorAge: request.body.visitorAge,
                        dateOfVisit: request.body.dateOfVisit,
                        timeOfVisit: request.body.timeOfVisit,
                        comments: request.body.comments,
                        id: id
    })
    response.end();
});

app.get('/addNewVisitor', async (request, response) => {
    const visitor = await listAllVisitors()
    response.send(json.stringify(visitor));
    response.end();
})


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

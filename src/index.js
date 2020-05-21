"use strict"

const {
    addNewVisitor,
    listAllVisitors,
    deleteVisitor
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
const {
    addContent, 
    displayAll
} = require('./app')

app.use(cors());
app.use(bodyParser.json());
app.use(urlencodedParser);
app.use('/', express.static('public'));

app.post('/addNewVisitor', express.static('src'));

app.get('/single-page-app', (request, response) => {
    return response.status(200).sendFile(__dirname + '/index.html')
})

app.get('/viewVisitor', (request, response) => {
    return responce.sendFile(__dirname + '/index.html')
})

app.post('/single-page-app', async(request, response) => {
    let visitorName = request.body.visitorName
    let assistant = request.body.assistant
    let visitorAge = request.body.visitorAge
    let dateOfVisit = request.body.dateOfVisit
    let timeOfVisit = request.body.timeOfVisit
    let comments = request.body.comments
    let visitor = await addNewVisitor(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments);
    response.render('index.html', {
        id: id,
        visitorName: request.body.visitorName,
        assistant: request.body.assistant,
        visitorAge: request.body.visitorAge,
        dateOfVisit: request.body.dateOfVisit,
        timeOfVisit: request.body.timeOfVisit,
        comments: request.body.comments
    });
    if(response.status == 2000) {
    response.end()
    }
})


const add = app.post('/visitor', async(request, response) => {
    const visitor = await addNewVisitor();
    response.status(200).json({
        status: 'ok',
        vistor: visitor
    })
})
    // console.log(add);                                                                                                

const del = app.delete('/visitor/:id', async(request, response) => {
    const id = request.params.id;
    const visitor = await deleteVisitor(id);
    response.status(200).json({
        status: 'ok',
        visitor: vistor[0]
    });
})

const list = app.get('/visitor', async(request, response) => {
    const name = request.params.visitorName;
    const visitor = await listAllVisitors();
    response.status(200).json({ 
        status: 'ok', 
        visitor: visitor 
    })
})



const server = app.listen({port}, () => {
    console.log(`Server is running on port ${port}`)
});

module.exports = {
    server
}

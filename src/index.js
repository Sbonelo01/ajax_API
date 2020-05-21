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


app.get('/single-page-app', (request, response) => {
    return response.status(200).sendFile(__dirname + '/index.html')
})

app.post('/addNewVisitor', async (request, response) => {
    let content = await addContent(request.body)
    console.log(content);
    response.status(200).json({
        message: 'success';
    })
});

app.get('/addNewVisitor', async (request, response) => {
    let view = await displayAll()
    response.status(200).json(view);
})

const server = app.listen({port}, () => {
    console.log(`Server is running on port ${port}`)
});

module.exports = {
    server
}

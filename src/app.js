"use strict"
//const server = require('./index')
const dotenv = require('dotenv').config();
const {
    Client
} = require('pg')

const client = new Client({
    host: 'localhost',
    user: 'user',
    password: 'pass',
    database: 'db',
    port: 5432
})

client.connect();

const createTable = async() => {
    return new Promise(async(request, response) => {
        let sql = await client.query(`CREATE TABLE IF NOT EXISTS VISITORS(
                id SERIAL PRIMARY KEY,
                visitorName varchar(255) NOT NULL,
                assistant varchar(255) NOT NULL,
                visitorAge int NOT NULL,
                dateOfVisit date NOT NULL,
                timeOfVisit time NOT NULL,
                comments text NOT NULL
                )`,
            (error, results) => {
                if (error) {
                    throw error;
                }
                //console.log(sql)
            }
        )
    })
}

createTable();

const addNewVisitor = async(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) => {
    return new Promise(async(request, response) => {
        let results = await client.query(`INSERT INTO VISITORS(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments],
            (error, results) => {
                if (error) {
                    throw error;
                }
                console.log(results.rows);
            });
    })
};

addNewVisitor();

const listAllVisitors = async(request, response) => {
    let results = await client.query(
        `SELECT * FROM visitors ORDER BY id ASC`,
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results.rows)
        }
    );
};

listAllVisitors();

const deleteVisitor = async(id) => {
    return new Promise(async(request, response) => {
        let results = await client.query(
            `DELETE FROM visitors WHERE id = $1`, [id],
            (error, results) => {
                if (error) {
                    throw error;
                }
                request(results.rows);
                console.log('deleted!!!')
            }
        );
    })
};

deleteVisitor();

module.exports = {
    addNewVisitor,
    listAllVisitors,
    deleteVisitor
}

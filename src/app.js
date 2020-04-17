"use strict"

const dotenv = require('dotenv').config();
const {
    Client
} = require('pg')

const client = new Client({
    host: '127.0.0.1',
    user: 'user',
    password: 'pass',
    database: 'db',
    port: 5432
})

//console.log(client)

client.connect();

const createTable = async() => {
    return new Promise(async(resolve, reject) => {
        let sql = await client.query(`CREATE TABLE IF NOT EXISTS VISITORS(
                id SERIAL PRIMARY KEY,
                visitorName varchar(255),
                assistant varchar(255),
                visitorAge int,
                dateOfVisit date,
                timeOfVisit time,
                comments text
                )`,
            (err, results) => {
                if (err) {
                    reject(err);
                }
                console.log(sql);
                resolve(sql)
            }
        )
    })
}

createTable();

const addNewVisitor = async(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) => {
    return new Promise(async(resolve, reject) => {
        let results = await client.query(`INSERT INTO VISITORS(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                console.log(results.rows[0]);
                resolve(results[0]);
            });
    })
};

addNewVisitor();

const listAllVisitors = async() => {
    return new Promise(async(resolve, reject) => {
        let results = await client.query(
            `SELECT * FROM VISITORS`,
            (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results.rows);
            }
        );
    })
};

listAllVisitors();

const deleteVisitor = async(id) => {
    return new Promise(async(resolve, reject) => {
        let results = await client.query(
            `DELETE FROM visitors WHERE id = $1`, [id],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                console.log('deleted!!!')
                resolve(results);
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

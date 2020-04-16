"use strict"

const dotenv = require('dotenv').config();
const {
    Client
} = require('pg')

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
})

client.connect();

const createTable = async() => {
    return new Promise(async(resolve, reject) => {
        let sql = await client.query(`CREATE TABLE VISITORS (
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
                console.log(results);
                resolve(results)
            }
        )
    })
}

createTable();

const addNewVisitor = async(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) => {
    return new Promise(async(resolve, reject) => {
        await client.query(`INSERT INTO VISITORS(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                console.log(results.rows[0]);
                resolve(results[0]);
            });
    })
}
const listAllVisitors = async() => {
    return new Promise(async(resolve, reject) => {
        await client.query(
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



const deleteVisitor = async(id) => {
    return new Promise(async(resolve, reject) => {
        await client.query(
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

module.exports = {
    addNewVisitor,
    listAllVisitors,
    deleteVisitor
}

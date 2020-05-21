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
    //console.log(client.host.id)

client.connect()

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

const displayAll = async() => {
    let text = `SELECT * FROM visitors`;
    try {
        let query = await client.query(text, values)
        return query.rows
    } catch(error){
        console.log(error)
    }
}
displayAll()

const addContent = async(object) => {
    let text = `INSERT INTO visitors(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`
    let values = [object.visitorName, object.assistant, object.visitorAge, object.dateOfVisit, object.timeOfVisit, object.comments];
    try {
        let query = await client.query(text, values)
        return query.rows;
    } catch(error){
        console.log('ERROR',error);
    }
}
addContent();

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

const deleteAll = aync() => {
    let text = `DELETE FROM visitors`
    try {
        let query = await.query(text, values)
        console.log(query.rows)
    } catch(error){
        console.log(error)
    }
}

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
    deleteAll,
    createTable,
    addNewVisitor,
    listAllVisitors,
    deleteVisitor,
    displayAll
}

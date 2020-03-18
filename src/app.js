"use strict"

const dotenv = require('dotenv').config();
const Pool = require("pg").Pool;
const pool = new Pool();

pool.connect((err, res) => {
    if (err) {
        console.log(err)
    }
    console.log(res);
});

const addNewVisitor = async(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) => {
    return new Promise(async(resolve, reject) => {
        await pool.query(`INSERT INTO VISITORS(visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [visitorName, assistant, visitorAge, dateOfVisit, timeOfVisit, comments],
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
        await pool.query(
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
        await pool.query(
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

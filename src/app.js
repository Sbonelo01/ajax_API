"use strict"

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

//console.log(client)

client.connect((error) => {
    if (error) {
        console.log(error)
    }
    console.log('CONNECTED...')
})

const createTable = async() => {
    return new Promise(async(request, response) => {
        let sql = await client.query(`CREATE TABLE IF NOT EXISTS visitors(
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

const updateVisitor = async(id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
    const sql = `
        UPDATE 
        visitors SET
        name = $2, age = $3, date_of_visit = $4, time_of_visit = $5, assistant = $6, comments = $7 
        WHERE id = $1 
        RETURNING *
    `;
    const data = [id, visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments];
    const res = await client.query(sql, data);
    return res.rows
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
                console.log('DELETED VISITOR !')
            }
        );
    })
};

const deleteVisitors = async() => {
        return new Promise(async(request, response) => {
            let results = await client.query(
                `DELETE FROM visitors RETURNING *`,
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                request(results.rows)
                console.log('DELETED ALL!')
            }
        )
    })
}

const viewVisitor = async(id) => {
    return new Promise(async(request, response) => {
        let results = await client.query(
            `SELECT * FROM visitors WHERE id = $1`, [id],
            (error, results) => {
                if(error) {
                    throw error;
                }
                request(results.rows)
            }
        )
    })
}

const viewVisitors = async() => {
    return new Promise(async(request, response) => {
        let results = await client.query(
            `SELECT * FROM visitors`,
            (error, results) => {
                if(error){
                    throw error;
                }
                request(results.rows)
            }
        )
    })
}

module.exports = {
    addNewVisitor,
    updateVisitor,
    deleteVisitor,
    deleteVisitors,
    viewVisitors,
    viewVisitor
}

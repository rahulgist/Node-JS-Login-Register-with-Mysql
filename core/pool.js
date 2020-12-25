const util = require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'nodelogin'
});

pool.getConnection((err,connection) => {
    if(err)
        console.log('Database not connected. Something went wrong')
    
        if(connection)
            connection.release();
        return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
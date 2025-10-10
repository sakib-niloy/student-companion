// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'university',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// module.exports = pool;



const mysql = require('mysql2/promise'); // Ensure you import the promise-based version

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'university'
});

module.exports = pool;

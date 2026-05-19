const mysql = require('mysql2/promise');

async function checkDatabase() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'university'
    });

    try {
        const [rows] = await pool.query('SELECT * FROM counselling_requests');
        console.log('Counselling Requests:', rows);
    } catch (error) {
        console.error('Error fetching requests:', error);
    } finally {
        await pool.end();
    }
}

checkDatabase();

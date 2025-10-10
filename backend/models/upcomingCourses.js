// models/upcomingCourses.js
const db = require('../config/db');

exports.getCoursesByCodes = async (courseCodes) => {
    try {
        // Hardcoded query for testing purposes
        const query = "SELECT * FROM upcoming_courses WHERE course_code IN (?)";
        
        console.log('Executing query:', query);
        
        // Use the promise-based method correctly
        const [results] = await db.query(query, [courseCodes]);

        console.log('Query results:', results); // Log the results of the query

        if (results.length === 0) {
            console.log('No courses found for the provided course codes.');
        }

        return results;
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
};


exports.saveFavouriteRoutine = (userId, routine) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO favourite_routines (user_id, routine) VALUES (?, ?)`;
        db.query(query, [userId, JSON.stringify(routine)], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

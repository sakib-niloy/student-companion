const db = require('../config/db');

// Search Faculty by Name
exports.searchFaculty = async (req, res) => {
    const { name } = req.query;
    try {
        const query = `
            SELECT 
                faculty.*, 
                CONCAT('[', GROUP_CONCAT(
                    CONCAT(
                        '{"day_of_week":"', counselling_times.day_of_week, 
                        '", "start_time":"', counselling_times.start_time, 
                        '", "end_time":"', counselling_times.end_time, '"}'
                    )
                SEPARATOR ','), ']') AS counselling_times
            FROM faculty
            LEFT JOIN counselling_times ON faculty.id = counselling_times.faculty_id
            WHERE faculty.name LIKE ?
            GROUP BY faculty.id
        `;
        const [results] = await db.query(query, [`%${name}%`]);
        res.json(results);
    } catch (error) {
        console.error('Error during faculty search:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

// Request Counselling
exports.requestCounselling = async (req, res) => {
    console.log("In requestCounselling function");
    console.log("Received request body:", req.body);
    
    try {
        const { studentId, facultyId, requestedTime } = req.body;

        // Validate input
        if (!studentId || !facultyId || !requestedTime) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log("Attempting to insert into database...");

        const query = `
            INSERT INTO counselling_requests (student_id, faculty_id, requested_time, status) 
            VALUES (?, ?, ?, 'pending')
        `;

        const [result] = await db.query(query, [studentId, facultyId, requestedTime]);

        console.log("Insert successful:", result);

        // Verify if rows were affected
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Request sent successfully' });
        } else {
            console.log("Insert failed, no rows affected");
            res.status(500).json({ error: 'Failed to insert request' });
        }

    } catch (error) {
        console.error('Error in requestCounselling:', error);

        // Log SQL-specific error if exists
        if (error.sqlMessage) {
            console.error('SQL Error:', error.sqlMessage);
        }
        res.status(500).json({ error: 'Database query error' });
    }
};


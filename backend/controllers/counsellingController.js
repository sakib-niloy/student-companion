const db = require('../config/db');

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

exports.approveCounselling = async (req, res) => {
    const { requestId } = req.body;
    try {
        const query = "UPDATE counselling_requests SET status = 'approved' WHERE id = ?";
        await db.promise().query(query, [requestId]);
        res.status(200).json({ message: 'Request approved' });
    } catch (error) {
        res.status(500).json({ error: 'Database query error' });
    }
};

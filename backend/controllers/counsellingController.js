const db = require('../config/db');

// --- Student Endpoints ---

// Request Counselling
exports.requestCounselling = async (req, res) => {
    try {
        const { studentId, facultyId, requestedTime } = req.body;
        if (!studentId || !facultyId || !requestedTime) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const query = "INSERT INTO counselling_requests (student_id, faculty_id, requested_time, status) VALUES (?, ?, ?, 'pending')";
        await db.query(query, [studentId, facultyId, requestedTime]);
        res.status(200).json({ message: 'Request sent successfully' });
    } catch (error) {
        console.error('Error in requestCounselling:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

// Get Student's Requests
exports.getStudentRequests = async (req, res) => {
    try {
        const { studentId } = req.query;
        const query = `
            SELECT r.*, f.name AS faculty_name
            FROM counselling_requests r
            JOIN faculty f ON r.faculty_id = f.id
            WHERE r.student_id = ?
        `;
        const [results] = await db.query(query, [studentId]);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching student requests:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

// --- Faculty Endpoints ---

// Get Counselling Requests for a Faculty Member
exports.getFacultyRequests = async (req, res) => {
    try {
        // Using req.user.id from authentication middleware
        const facultyId = req.user.id; 
        const query = `
            SELECT r.*, s.name AS student_name
            FROM counselling_requests r
            JOIN users s ON r.student_id = s.id
            WHERE r.faculty_id = ?
        `;
        const [results] = await db.query(query, [facultyId]);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching faculty requests:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

// Update Request Status (Approve/Reject)
exports.updateRequestStatus = async (req, res) => {
    try {
        const { requestId, status } = req.body; // Expecting status to be 'approved' or 'rejected'
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        const query = "UPDATE counselling_requests SET status = ? WHERE id = ?";
        await db.query(query, [status, requestId]);
        res.status(200).json({ message: `Request ${status}` });
    } catch (error) {
        console.error('Error updating request status:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

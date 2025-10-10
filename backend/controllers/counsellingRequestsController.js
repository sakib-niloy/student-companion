const db = require('../config/db');

// Get Counselling Requests for a Faculty Member
exports.getRequests = async (req, res) => {
    const { facultyId } = req.user;  // Assuming facultyId is extracted from authenticated user
    try {
        const query = `
            SELECT r.*, s.name AS student_name
            FROM counselling_requests r
            JOIN users s ON r.student_id = s.id
            WHERE r.faculty_id = ?
        `;
        const [results] = await db.promise().query(query, [facultyId]);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

// Approve Counselling Request
exports.approveRequest = async (req, res) => {
    const { requestId } = req.body;
    try {
        const query = "UPDATE counselling_requests SET status = 'approved' WHERE id = ?";
        await db.promise().query(query, [requestId]);
        res.status(200).json({ message: 'Request approved' });
    } catch (error) {
        console.error('Error approving request:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

// Reject Counselling Request
exports.rejectRequest = async (req, res) => {
    const { requestId } = req.body;
    try {
        const query = "UPDATE counselling_requests SET status = 'rejected' WHERE id = ?";
        await db.promise().query(query, [requestId]);
        res.status(200).json({ message: 'Request rejected' });
    } catch (error) {
        console.error('Error rejecting request:', error);
        res.status(500).json({ error: 'Database query error' });
    }
};

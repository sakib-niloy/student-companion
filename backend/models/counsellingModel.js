const db = require('../config/db');

const Counselling = {
    createRequest: async (studentId, facultyId, requestedTime) => {
        const query = "INSERT INTO counselling_requests (student_id, faculty_id, requested_time) VALUES (?, ?, ?)";
        return db.promise().query(query, [studentId, facultyId, requestedTime]);
    },

    approveRequest: async (requestId) => {
        const query = "UPDATE counselling_requests SET status = 'approved' WHERE id = ?";
        return db.promise().query(query, [requestId]);
    },
};

module.exports = Counselling;

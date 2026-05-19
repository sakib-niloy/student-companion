const express = require('express');
const router = express.Router();
const counsellingController = require('../controllers/counsellingController');
const authenticate = require('../middleware/authenticate');

// --- Student Routes ---
router.post('/request', authenticate, counsellingController.requestCounselling);
router.get('/my-requests', authenticate, counsellingController.getStudentRequests);

// --- Faculty Routes ---
router.get('/requests', authenticate, counsellingController.getFacultyRequests);
router.post('/update-status', authenticate, counsellingController.updateRequestStatus);

module.exports = router;

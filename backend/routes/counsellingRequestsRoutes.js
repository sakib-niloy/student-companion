const express = require('express');
const router = express.Router();
const counsellingRequestsController = require('../controllers/counsellingRequestsController');
const authenticate = require('../middleware/authenticate');

// Get all requests for a faculty member
router.get('/requests', authenticate, counsellingRequestsController.getRequests);

// Approve a request
router.post('/requests/approve', authenticate, counsellingRequestsController.approveRequest);

// Reject a request
router.post('/requests/reject', authenticate, counsellingRequestsController.rejectRequest);

module.exports = router;

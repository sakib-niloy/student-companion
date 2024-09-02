const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');


router.get('/search', facultyController.searchFaculty);
router.post('/request', facultyController.requestCounselling);  // Correct endpoint
// router.post('/request-counselling', facultyController.requestCounselling);
module.exports = router;

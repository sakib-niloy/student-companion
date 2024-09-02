const express = require('express');
const router = express.Router();
const examScheduleController = require('../controllers/examScheduleController');

router.post('/schedule', examScheduleController.getExamSchedule);

module.exports = router;

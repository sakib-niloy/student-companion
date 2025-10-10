// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/get-courses', courseController.getCoursesByCodes);
router.post('/save-favourite-routine', courseController.saveFavouriteRoutine);

module.exports = router;

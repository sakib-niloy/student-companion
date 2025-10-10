const express = require('express');
const router = express.Router();
const counsellingController = require('../controllers/counsellingController');

router.post('/request', counsellingController.requestCounselling);
router.post('/approve', counsellingController.approveCounselling);

module.exports = router;

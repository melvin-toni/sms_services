const express = require('express');
const router = express.Router();
const scheduleCtrl = require('../controllers/schedule');

router.get('/init', scheduleCtrl.initSchedule);

module.exports = router;
const express = require('express');
const router = express.Router();
const campignCtrl = require('../controllers/campaign');

router.post('/', campignCtrl.create);

router.get('/', campignCtrl.readAll);
router.get('/:id', campignCtrl.readOne);

module.exports = router;
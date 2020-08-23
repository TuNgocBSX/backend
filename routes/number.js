const express = require('express');

const router = express.Router();
const controllerNumber = require('../controller/number');

router.post('/new', controllerNumber.insert)
router.post('/', controllerNumber.create)
router.post('/old', controllerNumber.insertOLD)
router.post('/per', controllerNumber.getper)
module.exports = router;

const express = require('express');
const router = express.Router();

const { createLocations } = require('../controllers/locations_controller');

router.post('/create', createLocations);

module.exports = router;

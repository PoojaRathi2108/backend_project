const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');

router.get('/states', locationController.getStates);
router.get('/states/:stateId/cities', locationController.getCitiesByState);

module.exports = router;

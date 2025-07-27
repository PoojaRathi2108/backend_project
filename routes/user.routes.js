const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { userValidationRules, validate } = require('../validations/user.validation');
const upload = require('../middlewares/upload');

// Registration route
router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;

const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/authController');
const validateCpf = require('../middleware/validateCpfMiddleware');

router.post('/register', validateCpf, ctrl.register);

router.post('/login', ctrl.login);

module.exports = router;
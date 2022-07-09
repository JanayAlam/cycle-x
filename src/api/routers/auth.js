const router = require('express').Router();
const { reqValidator } = require('../middlewares');
const { authReqModel } = require('../models/req-models');
const authController = require('../controllers/auth');

router.post('/register', reqValidator(authReqModel), authController.register);

router.post('/login', () => {});

router.get('/forget-password', () => {});

router.post('/reset-password', () => {});

module.exports = router;

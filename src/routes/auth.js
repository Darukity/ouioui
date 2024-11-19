const router = require('express').Router();
const authController = require('../controllers/auth');

//POST / register a user
router.post('/register', authController.register);

//POST /login authenticate user
router.post('/login', authController.login);

module.exports = router;

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/login', authMiddleware.checkNotAuthenticated, AuthController.login);
router.post('/login', authMiddleware.checkNotAuthenticated, authMiddleware.validateLogin, AuthController.loginPost);
router.get('/register', authMiddleware.checkNotAuthenticated, AuthController.register);
router.post('/register', authMiddleware.checkNotAuthenticated, authMiddleware.validateRegister, AuthController.registerPost);
router.post('/logout', AuthController.logout);

module.exports = router;
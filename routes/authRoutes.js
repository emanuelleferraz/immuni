const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas de login
router.get('/login', authMiddleware.checkNotAuthenticated, AuthController.login);
router.post('/login', authMiddleware.checkNotAuthenticated, AuthController.loginPost);

// Rotas de registro
router.get('/register', authMiddleware.checkNotAuthenticated, AuthController.register);
router.post('/register', authMiddleware.checkNotAuthenticated, authMiddleware.validateRegister, AuthController.registerPost);

// Rota de logout
router.get('/logout', AuthController.logout);

module.exports = router;
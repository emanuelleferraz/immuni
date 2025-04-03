const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware.checkAuthenticated, DashboardController.showDashboard);
router.get('/dashboard', authMiddleware.checkAuthenticated, DashboardController.showDashboard);
router.get('/progresso', authMiddleware.checkAuthenticated, DashboardController.showProgress);

module.exports = router;
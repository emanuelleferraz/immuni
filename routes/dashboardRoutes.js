const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/dashboard', authMiddleware.checkAuthenticated, DashboardController.showDashboard);

module.exports = router;
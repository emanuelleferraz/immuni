const express = require('express');
const router = express.Router();
const VaccineController = require('../controllers/vaccineController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/vacinas', VaccineController.listAll);
// router.get('/vacinas/:id', authMiddleware.checkAuthenticated, VaccineController.showDetails);

module.exports = router;
const express = require('express');
const router = express.Router();
const RecordController = require('../controllers/recordController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/registrar-vacina', authMiddleware.checkAuthenticated, RecordController.createForm);
router.post('/registrar-vacina', authMiddleware.checkAuthenticated, RecordController.create);
router.get('/editar-registro/:id', authMiddleware.checkAuthenticated, RecordController.editForm);
router.post('/editar-registro/:id', authMiddleware.checkAuthenticated, RecordController.update);
router.post('/excluir-registro/:id', authMiddleware.checkAuthenticated, RecordController.delete);

module.exports = router;
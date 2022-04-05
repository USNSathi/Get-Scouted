const router = require('express').Router();

const authController = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleWare.js');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', authMiddleware.isAuthenticated, authController.deAuth);

module.exports = router;
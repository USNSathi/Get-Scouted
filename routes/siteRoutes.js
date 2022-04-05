const router = require('express').Router();

const siteController = require('../controllers/siteController');

const authMiddleware = require('../middlewares/authMiddleWare.js');


router.get('/', authMiddleware.isLogin, siteController.landingPage);

router.get('/aboutus', authMiddleware.isLogin, siteController.aboutPage);

router.get('/contact', authMiddleware.isLogin, siteController.contactPage);

router.get('/login', authMiddleware.isLogin, siteController.loginPage);

router.get('/signup', authMiddleware.isLogin, siteController.signupPage);

router.get('/error', authMiddleware.isLogin, siteController.errorPage);

module.exports = router;


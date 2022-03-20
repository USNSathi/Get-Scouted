const router = require('express').Router();

const siteController = require('../controllers/siteController');

router.get('/', siteController.landingPage);

router.get('/about', siteController.aboutPage);

router.get('/contact', siteController.contactPage);

router.get('/login', siteController.loginPage);

router.get('/signup', siteController.signupPage);

module.exports = {
    router
};


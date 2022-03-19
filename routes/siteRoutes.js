const router = require('express').Router();

const siteController = require('../controllers/siteController');

router.get('/', siteController.landingPage);

router.get('/about', siteController.aboutPage);

module.exports = {
    router
};


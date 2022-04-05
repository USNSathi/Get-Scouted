const router = require('express').Router();

const applicantController = require('../controllers/applicantController');

const authMiddleware = require('../middlewares/authMiddleWare.js');
const roleValidation = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware.isAuthenticated, roleValidation.isApplicant, applicantController.profileCreateUpdate);
router.post('/verify/:uid', authMiddleware.isAuthenticated, roleValidation.isAdmin, applicantController.verifyProfile);

router.get('/profile/edit', authMiddleware.isAuthenticated, roleValidation.isApplicant, applicantController.profileUpdateView);
router.get('/', authMiddleware.isAuthenticated, roleValidation.isApplicant, applicantController.dashboardView);

module.exports = router;

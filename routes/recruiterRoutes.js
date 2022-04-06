const router = require('express').Router();
const recruiterController = require('../controllers/recruiterController');

const authMiddleware = require('../middlewares/authMiddleWare.js');
const roleValidation = require('../middlewares/roleMiddleware');

router.get('/', authMiddleware.isAuthenticated, roleValidation.isRecruiter, recruiterController.dashboardView);
router.get('/profile', authMiddleware.isAuthenticated, roleValidation.isRecruiter, recruiterController.profileView);
router.get('/profile/edit', authMiddleware.isAuthenticated, roleValidation.isRecruiter, recruiterController.updateProfileView);
router.post('/', authMiddleware.isAuthenticated, roleValidation.isRecruiter, recruiterController.profileCreateUpdate);

module.exports = router;
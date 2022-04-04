const router = require('express').Router();

const siteRoutes = require('./siteRoutes');
const authRoutes = require('./authRoutes');
const jobRoutes = require('./jobRoutes');
const applicantRoutes = require('./applicantRoutes');

router.use('/', siteRoutes);
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);

router.use('/applicant', applicantRoutes);

module.exports = router;

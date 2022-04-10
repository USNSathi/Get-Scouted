const router = require('express').Router();

const siteRoutes = require('./siteRoutes');
const authRoutes = require('./authRoutes');
const jobRoutes = require('./jobRoutes');
const applicationRoutes = require('./applicationRoutes');
const applicantRoutes = require('./applicantRoutes');
const recruiterRoutes = require('./recruiterRoutes');

router.use('/', siteRoutes);
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/application', applicationRoutes);

router.use('/applicant', applicantRoutes);
router.use('/recruiter', recruiterRoutes);

module.exports = router;

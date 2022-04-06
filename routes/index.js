const router = require('express').Router();

const siteRoutes = require('./siteRoutes');
const authRoutes = require('./authRoutes');
const jobRoutes = require('./jobRoutes');
const applicantRoutes = require('./applicantRoutes');
const recruiterRoutes = require('./recruiterRoutes');

router.use('/', siteRoutes);
router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);

router.use('/applicant', applicantRoutes);
router.use('/recruiter', recruiterRoutes);

module.exports = router;

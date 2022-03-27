const router = require('express').Router();

const siteRoutes = require('./siteRoutes');
const authRoutes = require('./authRoutes');

router.use('/', siteRoutes);
router.use('/auth', authRoutes);

module.exports = router;

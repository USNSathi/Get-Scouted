
const isAuthenticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

const isRecruiter = (req, res, next) => {

    if (req.user.role === 'recruiter') {
        return next();
    }
    res.redirect('/login');
};

const isCandidate = (req, res, next) => {

    if (req.user.role === 'candidate') {
        return next();
    }
    res.redirect('/login');
};

module.exports = {
    isAuthenticate,
    isRecruiter,
    isCandidate
};

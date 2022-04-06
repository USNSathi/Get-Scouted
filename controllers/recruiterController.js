const Recruiter = require('../models/recruiters');

const dashboardView = (req, res) => {

    const data = res.locals.data;

    if (data.user.phone == '' || data.user.phone == null) {
        res.redirect('/recruiter/profile/edit');
    } else {
        res.render('recruiter/index', { url: "/recruiter", title: "Dashboard", isLogin: res.locals.isLogin });
    }
}

const profileView = (req, res) => {

    const data = res.locals.data;

    res.render('recruiter/profile', { url: "/recruiter/profile", title: "Profile", isLogin: res.locals.isLogin });

};

const updateProfileView = (req, res) => {

    const data = res.locals.data;

    res.render('recruiter/profile', { url: "/recruiter/profile/edit", title: "Profile update", isLogin: res.locals.isLogin });

};


module.exports = {
    dashboardView,
    profileView,
    updateProfileView,
};
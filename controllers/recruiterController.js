const Recruiter = require('../models/recruiters');
const User = require('../models/users');

const profileCreateUpdate = async (req, res) => {

    const uid = res.locals.data.user.id;
    const { phone, address } = req.body;

    const { companyName, status, region, country, contractNumber, yearOfEstablishment, companyType, companyAddress, businessDescription, tradingLicense, websiteURL } = req.body;

    // res.send(req.body);

    User.update({
        phone,
        address,
    }, {
        where: {
            id: uid
        }
    }).then(() => {

        Recruiter.upsert({
            companyName: companyName,
            status: status,
            region: region,
            country: country,
            contractNumber: contractNumber,
            yearOfEstablishment: yearOfEstablishment,
            companyType: companyType,
            companyAddress: companyAddress,
            businessDescription: businessDescription,
            tradingLicense: tradingLicense,
            websiteURL: websiteURL,
        }, {
            where: {
                uid: uid,
            },
        }).then((recruiter, isCreated) => {
            console.log("New user : ", isCreated, " Recruiter : ", recruiter);
            res.redirect('/recruiter/');

        }).catch((err) => {
            req.session.message = err.message;
            res.redirect('/error');
        });

    }).catch(err => {
        // console.log(err);
        req.session.message = err.message;

        res.redirect('/error');

    });


    // // check data is valid
    // // console.log(req.body);

};
const dashboardView = (req, res) => {

    const data = res.locals.data;

    if (data.user.phone == '' || data.user.phone == null) {
        res.redirect('/recruiter/profile/edit');
    } else {
        res.render('recruiter/index', { url: "/recruiter", title: "Dashboard", isLogin: res.locals.isLogin });
    }
}

const profileView = async (req, res) => {

    const data = res.locals.data;

    const recruiter = await Recruiter.findOne({
        where: {
            uid: data.user.id
        }
    }).then((recruiter) => {
        // console.log(recruiter);
        return recruiter;
    }).catch((err) => {
        return {};
    });

    res.locals.data.recruiter = recruiter;

    res.render('recruiter/profile', { url: "/recruiter/profile", title: "Profile", isLogin: res.locals.isLogin, data: data });
    // res.send({ url: "/recruiter/profile", title: "Profile", isLogin: res.locals.isLogin, data: data });

};

const createProfileView = (req, res) => {

    const data = res.locals.data;

    res.render('recruiter/editCompanyProfile', { url: "/recruiter/profile/edit", title: "Create Profile", isLogin: res.locals.isLogin });

};

const updateProfileView = (req, res) => {

    const data = res.locals.data;

    res.render('recruiter/updateCompanyProfile', { url: "/recruiter/profile/update", title: "Profile update", isLogin: res.locals.isLogin });

};

const jobsView = (req, res) => {
    const data = res.locals.data;

    res.render('recruiter/jobs', { url: "/recruiter/jobs", title: "Ongoing Jobs", isLogin: res.locals.isLogin });

};

const createJobView = (req, res) => {
    const data = res.locals.data;

    res.render('recruiter/jobPost', { url: "/recruiter/jobs/post", title: "Create Job", isLogin: res.locals.isLogin });
}


module.exports = {
    dashboardView,
    createJobView,
    jobsView,
    profileView,
    createProfileView,
    updateProfileView,

    profileCreateUpdate,
};
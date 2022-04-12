const Recruiter = require('../models/recruiters');
const User = require('../models/users');
const Job = require('../models/jobs');

const tokenGenerator = require('../utils/tokenGenerator');
const jobApplicationController = require('./jobApplicationController');


const profileCreateUpdate = async (req, res) => {

    const uid = res.locals.data.user.id;
    const { phone, address } = req.body;

    const { companyName, status, region, country, contactNumber, yearOfEstablishment, companyType, companyAddress, businessDescription, tradingLicense, websiteURL } = req.body;

    console.log(res.locals.data);

    // res.send(req.body);

    await User.update({
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
            contactNumber: contactNumber,
            yearOfEstablishment: yearOfEstablishment,
            companyType: companyType,
            companyAddress: companyAddress,
            businessDescription: businessDescription,
            tradingLicense: tradingLicense,
            websiteURL: websiteURL,
            uid: uid,
        }, {
            where: {
                uid: uid
            }
        }).then((recruiter, isCreated) => {

            console.log(recruiter.dataValues);

            console.log("New user : ", isCreated, " Recruiter : ", recruiter);

            // update cookie
            const user = res.locals.data.user;
            user.phone = phone;
            user.address = address;

            const token = tokenGenerator.generateToken(res.locals.data.credential, user);

            /*
            * Clear previous cookie and set new cookie
            */
            res.clearCookie('getscouted');

            res.cookie('getscouted', token, {
                maxAge: 12 * 60 * 60 * 1000, // 12 hour
                httpOnly: true,
                sameSite: true,
                secure: true,
                signed: true,
            });


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
const dashboardView = async (req, res) => {

    const data = res.locals.data;

    if (data.recruiter.id == undefined) {
        data.recruiter.id = '0';
    }

    // console.log(data);
    const total = await Job.count({
        where: {
            rid: data.recruiter.id
        }
    }).then(count => {
        return count;
    }).catch(err => {
        // console.log(err);
        return 0;
    });

    const active = await Job.count({
        where: {
            rid: data.recruiter.id,
            status: "open"
        }
    }).then(count => {
        return count;
    }).catch(err => {
        // console.log(err);
        return 0;
    });


    if (data.user.phone == '' || data.user.phone == null) {
        res.redirect('/recruiter/profile/edit');
    } else {
        res.render('recruiter/index', { url: "/recruiter", title: "Dashboard", isLogin: res.locals.isLogin, data: data, total: total, active: active });
    }
}

const profileView = async (req, res) => {
    const data = res.locals.data;

    if (!data.recruiter) {
        data.recruiter = {};
    }

    res.render('recruiter/companyProfile', { url: "/recruiter/profile", title: "Profile", isLogin: res.locals.isLogin, data: data });
    // res.send({ url: "/recruiter/profile", title: "Profile", isLogin: res.locals.isLogin, data: data });

};

const createProfileView = async (req, res) => {
    const data = res.locals.data;
    const uid = data.user.id;

    if (!data.recruiter) {
        data.recruiter = {};
    }

    // console.log("Later", data);

    await res.render('recruiter/editCompanyProfile', { url: "/recruiter/profile/edit", title: "Create Profile", isLogin: res.locals.isLogin, data: data });
};

const updateProfileView = (req, res) => {
    const data = res.locals.data;

    res.render('recruiter/updateCompanyProfile', { url: "/recruiter/profile/update", title: "Profile update", isLogin: res.locals.isLogin, data: data });

};

const jobsView = async (req, res) => {
    const data = res.locals.data;

    const rid = data.recruiter.id;

    await Job.findAll({
        where: {
            rid: rid
        }
    }).then(jobs => {
        // console.log(jobs);
        data.jobs = jobs.map(job => job.dataValues);
    }).catch(err => {
        console.log(err);
        data.jobs = [];
    });

    console.log(data);

    await res.render('recruiter/jobs', { url: "/recruiter/jobs", title: "Ongoing Jobs", isLogin: res.locals.isLogin, data: data });

};

const createJobView = (req, res) => {
    const data = res.locals.data;
    // console.log(data);

    res.render('recruiter/jobPost', { url: "/recruiter/jobs/post", title: "Create Job", isLogin: res.locals.isLogin });
}

const allApplicantView = async (req, res) => {
    const data = res.locals.data;

    data.applications = await jobApplicationController.getApplicants(req, res);

    // res.send({ url: "/recruiter/jobs/applicants", title: "All Applicants", isLogin: res.locals.isLogin, data: data });
    res.render('recruiter/JobApplications', { url: "/recruiter/jobs/applicants", title: "All Applicants", isLogin: res.locals.isLogin, data: data });
}

module.exports = {
    dashboardView,
    createJobView,
    jobsView,
    profileView,
    createProfileView,
    updateProfileView,
    allApplicantView,

    profileCreateUpdate,
};
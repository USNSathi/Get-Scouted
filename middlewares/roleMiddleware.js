const Admin = require('../models/admins');
const Recruiter = require('../models/recruiters');
const Applicant = require('../models/applicants');

const isAdmin = async (req, res, next) => {
	const { role } = res.locals.data.credential;

	if (role === 'admin') {
		await Admin.findOne({
			where: { uid: res.locals.data.user.id }
		}).then(admin => {
			if (admin) {
				res.locals.data.admin = admin;
			} else {
				res.locals.data.admin = {};
			}
		}).catch(err => {
			res.locals.data.admin = {};
		});

		return next();
	} else {
		res.session.message = 'Access denied';
		res.redirect('/login');
	}
};

const isRecruiter = async (req, res, next) => {
	const { role } = res.locals.data.credential;
	const id = res.locals.data.user.id;

	if (role === 'recruiter') {

		// console.log(res.locals.data);


		const recruiterData = await Recruiter.findOne({ where: { uid: id } }).then(recruiter => {

			// console.log(recruiter);

			if (recruiter) {
				res.locals.data.recruiter = recruiter.dataValues;
			} else {
				res.locals.data.recruiter = {};
			}

			// console.log("Inside Role Validator :", res.locals.data);

			next();

		}).catch(err => {

			console.log("Middleware : ", err);

			res.locals.data.recruiter = {};

			next();

		});

		// console.log(res.locals.data);

	} else {
		res.session.message = 'Access denied';
		await res.redirect('/error');
	}
};

const isApplicant = async (req, res, next) => {
	const { role } = res.locals.data.credential;

	if (role === 'applicant') {
		await Applicant.findOne({ where: { uid: res.locals.data.user.id } }).then(applicant => {
			if (applicant) {
				res.locals.data.applicant = applicant.dataValues;
			} else {
				res.locals.data.applicant = {};
			}
		}).catch(err => {
			res.locals.data.applicant = {};
		});

		return next();
	} else {
		res.session.message = 'Access denied';
		res.redirect('/error');
	}
};

module.exports = {
	isAdmin,
	isRecruiter,
	isApplicant
};
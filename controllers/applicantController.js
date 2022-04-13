const Applicant = require('../models/applicants');
const User = require('../models/users');
const Job = require('../models/jobs');


const tokenGenerator = require('../utils/tokenGenerator');
const jobApplicationController = require('./jobApplicationController');

// user itself can perform this operation
const profileCreateUpdate = (req, res) => {

	const uid = res.locals.data.user.id;
	const { phone, address } = req.body;

	const { status, region, country, currentPosition, currentCompany, birthday, education, skill } = req.body;

	// console.log(req.body);

	User.update({
		phone,
		address,
	}, {
		where: {
			id: uid
		},
	}).then(() => {

		var url = '';
		if (req.file) {
			url = req.file.path.replace('assets', '');

			Applicant.upsert(
				{
					cv: url,
					dob: birthday,
					skill: skill,
					status: status,
					education: education,
					region: region,
					country: country,
					currentCompany: currentCompany,
					currentPosition: currentPosition,
					uid: uid,
				},
				{
					where: {
						uid: uid,
					},
				}
			)
				.then((applicant, isCreated) => {
					// console.log("New user : ", isCreated, " Applicant : ", applicant);
					// 

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

					res.redirect('/applicant/');
				})
				.catch((err) => {
					// console.error(err);

					req.session.message = err.message;
					res.redirect('/error');
				});
		} else {
			Applicant.upsert(
				{
					cv: req.body.previousCV,
					dob: birthday,
					skill: skill,
					status: status,
					education: education,
					region: region,
					country: country,
					currentCompany: currentCompany,
					currentPosition: currentPosition,
					uid: uid,
				},
				{
					where: {
						uid: uid,
					},
				}
			)
				.then((applicant, isCreated) => {
					// console.log("New user : ", isCreated, " Applicant : ", applicant);
					// 

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

					res.redirect('/applicant/');
				})
				.catch((err) => {
					// console.error(err);

					req.session.message = err.message;
					res.redirect('/error');
				});
		}

	}).catch(err => {
		console.log(err);
	});

	// // check data is valid
	// // console.log(req.body);

};

// admin can perform this operation
const verifyProfile = (req, res) => {
	const { uid } = req.params;
	const { isVerified } = req.body;

	Applicant.update(
		{
			isVerified: isVerified,
		},
		{
			where: {
				uid: uid,
			},
		}
	)
		.then((applicant) => {
			res.status(201);
			res.send({
				message: 'Applicant verified successfully',
				applicant: applicant,
			});
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Error verifying applicant',
				applicant: {},
			});
		});
};

const profileCreateView = (req, res) => {

	const data = res.locals.data;

	res.render('applicant/editProfile', { url: "/applicant/profile/edit", title: "Create profile", data: data });
}

const profileUpdateView = async (req, res) => {

	const data = res.locals.data;
	const applicant = await Applicant.findOne({
		where: {
			uid: res.locals.data.user.id,
		},
	}).then((applicant) => {
		return applicant;
	}).catch((err) => {
		return {};
	});

	if (!applicant) {
		res.redirect('/error');
	}
	data.applicant = applicant;

	res.render('applicant/updateProfile', { url: "/applicant/profile/update", title: "Update profile", data: data });
}

const dashboardView = (req, res) => {
	const data = res.locals.data;

	// console.log(data);

	if (data.user.phone == '' || data.user.phone == null) {
		res.redirect('/applicant/profile/edit');
	} else {
		res.render('applicant/index', { url: "/applicant", title: "Dashboard", isLogin: res.locals.isLogin });
	}
}

const profileView = (req, res) => {
	const data = res.locals.data;

	Applicant.findOne({
		where: {
			uid: res.locals.data.user.id,
		},
	})
		.then((applicant) => {
			data.applicant = applicant;
			// console.log(data);
			res.render('applicant/profile', { url: "/applicant/profile", title: "Profile", data: data });
		}).catch((err) => {
			res.redirect('/error');
		});
}

const jobsView = async (req, res) => {
	const data = res.locals.data;

	const jobs = await Job.findAll({
		where: {
			status: 'open',
		},
		order: [
			['createdAt', 'DESC'],
		],
	}).then((jobs) => {
		return jobs;
	}).catch((err) => {
		return [];
	});

	data.jobs = jobs;

	res.render('applicant/jobs', { url: "/applicant/jobs", title: "Jobs", data: data });
}

const applicationView = async (req, res) => {
	const data = res.locals.data;

	data.jobs = await jobApplicationController.getAppliedJobs(req, res);

	// console.log(data.jobs);

	res.render('applicant/applications', { url: "/applicant/applications", title: "Job Applications", data: data });
	// res.send({ url: "/applicant/applications", title: "Job Applications", data: data });
}

module.exports = {
	profileCreateUpdate,
	verifyProfile,
	profileCreateView,
	profileUpdateView,
	dashboardView,
	profileView,
	jobsView,
	applicationView,
};
const Applicant = require('../models/applicants');
const User = require('../models/users');

// user itself can perform this operation
const profileCreateUpdate = (req, res) => {
	// here
	// get cv from req.files
	// and save it to the database


	var { path } = req.file ? req.file : '';

	const uid = res.locals.data.user.id;
	const { phone, address } = req.body;

	const { status, region, country, currentPosition, currentCompany, birthday, education, skill } = req.body;

	if (path != '') {
		path = path.replace('assets', '');
	}

	User.update({
		phone,
		address,
	}, {
		where: {
			id: uid
		}
	}).then(() => {
		Applicant.upsert(
			{
				cv: path,
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
				// if (isCreated) {
				res.redirect('/applicant/');
				// }
				// else {
				// 	res.status(201);
				// 	res.send({
				// 		message: 'Applicant updated successfully',
				// 		applicant: applicant,
				// 	});
				// }
			})
			.catch((err) => {
				// console.error(err);

				req.session.message = err.message;
				res.redirect('/error');
				// res.status(500);
				// res.send({
				// 	message: 'Error creating applicant',
				// 	applicant: {},
				// });
			});

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

const profileUpdateView = (req, res) => {

	const data = res.locals.data;

	res.render('applicant/editProfile', { url: "/applicant/profile/edit", title: "Create profile", data: data });
}

const dashboardView = (req, res) => {
	const data = res.locals.data;

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
			res.status(500).json({
				message: 'Error fetching applicant',
				applicant: {},
			});
		});
}

const jobsView = (req, res) => {
	const data = res.locals.data;

	res.render('applicant/jobs', { url: "/applicant/jobs", title: "Jobs", data: data });
}

const applicationView = (req, res) => {
	const data = res.locals.data;

	res.render('applicant/applications', { url: "/applicant/applications", title: "Job Applications", data: data });
}

module.exports = {
	profileCreateUpdate,
	verifyProfile,
	profileUpdateView,
	dashboardView,
	profileView,
	jobsView,
	applicationView,
};
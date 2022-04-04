const Applicant = require('../models/applicants');

// user itself can perform this operation
const profileCreateUpdate = (req, res) => {
	// here
	// get cv from req.files
	// and save it to the database

	const { status, location, currentPosition, currentCompany, uid } = req.body;

	// check data is valid
	// console.log(req.body);

	Applicant.upsert(
		{
			status: status,
			location: location,
			currentPosition: currentPosition,
			currentCompany: currentCompany,
			uid,
		},
		{
			where: {
				uid: uid,
			},
		}
	)
		.then((applicant, isCreated) => {
			// console.log("New user : ", isCreated, " Applicant : ", applicant);
			if (isCreated) {
				res.status(201);
				res.send({
					message: 'Applicant created successfully',
					applicant: applicant,
				});
			} else {
				res.status(201);
				res.send({
					message: 'Applicant updated successfully',
					applicant: applicant,
				});
			}
		})
		.catch((err) => {
			// console.error(err);

			res.status(500);
			res.send({
				message: 'Error creating applicant',
				applicant: {},
			});
		});
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
	res.render('applicant/editProfile', { url: "/applicant/profile/edit", title: "Create profile" });
}

module.exports = {
	profileCreateUpdate,
	verifyProfile,
	profileUpdateView,
};
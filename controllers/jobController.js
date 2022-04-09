const Job = require('../models/jobs');

const create = async (req, res) => {
	const rid = res.locals.data.recruiter.id;
	const { title, description, deadline, type, placement, salary, location, vacancy, status } = req.body;

	// console.log("CREATE JOB: ", res.locals.data);
	// console.log(req.body);

	// res.send(req.body);

	await Job.create({
		title: title,
		description: description,
		type: type,
		deadline: deadline,
		placement: placement,
		salary: salary,
		location: location,
		vacancy: vacancy,
		status: status,
		rid: rid,
	})
		.then((job) => {
			res.status(201);
			res.send({
				message: 'Job created successfully',
				job: job,
			});

		})
		.catch((err) => {
			console.error(err);

			res.status(500);
			res.send({
				message: 'Error creating job',
				job: {},
			});
		});
};

const updateStatus = (req, res) => {
	const { id, status, rid } = req.body;

	Job.update(
		{
			status: status,
		},
		{
			where: {
				id: id,
				rid: rid,
			},
		}
	)
		.then(() => {
			res.status(201);
			res.send({
				message: 'Job updated successfully',
			});
		})
		.catch((err) => {
			// console.error(err);

			res.status(500);
			res.send({
				message: 'Error creating job',
				job: {},
			});
		});
};

const deleteJob = (req, res) => {
	const { id, rid } = req.body;

	Job.destroy({
		where: {
			id: id,
			rid: rid,
			isVerified: false,
		},
	})
		.then(() => {
			res.status(200);
			res.send({
				message: 'Job deleted successfully',
			});
		})
		.catch((err) => {
			// console.error(err);

			res.status(500);
			res.send({
				message: 'Error deleting job',
				job: {},
			});
		});
};

const verify = (req, res) => {
	const { id, rid, isVerified } = req.body;

	Job.update(
		{
			isVerified: isVerified,
		},
		{
			where: {
				id: id,
				rid: rid,
			},
		}
	)
		.then(() => {
			res.status(200);
			res.send({
				message: 'Job verified successfully',
			});
		})
		.catch((err) => {
			// console.error(err);

			res.status(500);
			res.send({
				message: 'Error verifying job',
				job: {},
			});
		});
};

const getSameCompanyJobs = (req, res) => {
	const { rid } = req.body;

	Job.findAll({
		where: {
			rid: rid,
		},
	})
		.then((jobs) => {
			res.status(200);
			res.send({
				message: 'Jobs fetched successfully',
				jobs: jobs,
			});
		})
		.catch((err) => {
			// console.error(err);

			res.status(500);
			res.send({
				message: 'Error fetching jobs',
				jobs: [],
			});
		});
};

const openJobs = (req, res) => {
	Job.findAll({
		where: {
			status: 'open',
		},
	})
		.then((jobs) => {
			res.status(200);
			res.send({
				message: 'Jobs fetched successfully',
				jobs: jobs,
			});
		})
		.catch((err) => {
			// console.error(err);

			res.status(500);
			res.send({
				message: 'Error fetching jobs',
				jobs: [],
			});
		});
};

const getAllJobs = (req, res) => {
	Job.findAll({
		order: [['deadline', 'ASC']],
	})
		.then((jobs) => {
			res.status(200);
			res.send({
				message: 'Jobs fetched successfully',
				jobs: jobs,
			});
		})
		.catch((err) => {
			// console.error(err);

			res.status(500);
			res.send({
				message: 'Error fetching jobs',
				jobs: [],
			});
		});
};

module.exports = {
	create,
	updateStatus,
	deleteJob,
	verify,
	openJobs,
	getAllJobs,
	getSameCompanyJobs,
};

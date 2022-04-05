const isAdmin = (req, res, next) => {
	const { role } = res.locals.data.credential;

	if (role === 'admin') {
		return next();
	} else {
		res.session.message = 'Access denied';
		res.redirect('/login');
	}
};

const isRecruiter = (req, res, next) => {
	const { role } = res.locals.data.credential;

	if (role === 'recruiter') {
		return next();
	} else {
		res.session.message = 'Access denied';
		res.redirect('/login');
	}
};

const isApplicant = (req, res, next) => {
	const { role } = res.locals.data.credential;

	if (role === 'applicant') {
		return next();
	} else {
		res.session.message = 'Access denied';
		res.redirect('/login');
	}
};

module.exports = {
	isAdmin,
	isRecruiter,
	isApplicant
};
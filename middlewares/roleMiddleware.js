const isAdmin = (req, res, next) => {
	const { role } = res.locals.user;

	if (role === 'admin') {
		return next();
	} else {
		res.session.message = 'Access denied';
		res.redirect('/login');
	}
};

const isRecruiter = (req, res, next) => {
	const { role } = res.locals.user;

	if (role === 'recruiter') {
		return next();
	} else {
		res.session.message = 'Access denied';
		res.redirect('/login');
	}
};

const isApplicant = (req, res, next) => {
	const { role } = res.locals.user;

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
const isAuthenticated = (req, res, next) => {
	var cookies = req.signedCookies.getscouted;
	var accessToken = '';

	// console.log("cookies: ", cookies);

	try {
		// console.log("Try");
		accessToken = cookies && cookies.accessToken.split(' ')[1];
	} catch (err) {
		console.log(err);
	}

	if (cookies == undefined || tokens == undefined) {
		req.session.message = 'Access denied';
		res.redirect('/404');
		return;
	}

	jwt.verify(tokens.accessToken, process.env.ACCESS_TOKEN_SECRET || config.ACCESS_TOKEN_SECRET, (err, decodeData) => {
		// console.log("ACCESS TOKEN VERIFY: ",tokens.accessToken);

		if (err) {
			if (err.name == 'TokenExpiredError') {
				// Timeout
				req.session.message = 'Login timeout';
				res.redirect('/login');
			}

			if (!err.message) {
				res.session.message = err.message;
				return res.redirect('/404');
			}
		} else {
			res.locals.user = decodeData;

			// console.log("SUCCESS: AuthMiddleware: ", res.locals);
			// console.log("DECODE: AuthMiddleware: ", decodeData);

			// console.log("ERROR: AuthMMiddleware", err);

			next();
		}
	});
};

module.exports = {
	isAuthenticated,
};

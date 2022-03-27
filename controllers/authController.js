const Credentials = require('../models/credentials');
const User = require('../models/users');

const tokenGenerator = require('../utils/tokenGenerator');

const login = (req, res) => {
    const { email, password } = req.body;

    Credentials.findOne(email).then(credential => {
        if (!credential) {
            res.locals.message = 'Login failed';
        }

        else if (credential.validPassword(password)) {
            res.locals.credential = {
                id: credential.id,
                email: credential.email,
            };

            User.findOne(credential.id).then(user => {
                res.locals.user = {
                    id: user.id,
                    name: user.name,
                    photo: user.photo,
                    phone: user.phone,
                    role: user.role,
                    isBan: user.isBan,
                };

                const token = tokenGenerator.generateToken(
                    credential.dataValues,
                    user.dataValues
                );

                res.locals.token = token;

                res.cookie('token', token, {
                    maxAge: 1 * 60 * 60 * 1000, // 1 hour
                    httpOnly: true,
                    sameSite: true,
                    secure: true,
                    signed: true,
                });

                if (user.role === 'recruiter') {
                    res.redirect('/recruit');
                } else if (user.role === 'applicant') {
                    res.redirect('/apply');
                } else if (user.role === 'admin') {
                    res.redirect('/admin');
                } else {
                    res.redirect('/notfound');
                }
            }).catch(err => {
                res.locals.message = 'Login failed';
                res.locals.user = {};
            });
        }
    });
};

const register = (req, res) => {
    const { email, password, } = req.body;

    // api testing starts
    console.log(req.body);

    res.status(200);
    res.send({
        email: email,
        password: password
    })
    // api testing ends

};

const deAuth = (req, res) => {

};

module.exports = {
    login,
    register,
    deAuth,
}
const Credentials = require('../models/credentials');
const User = require('../models/users');

const tokenGenerator = require('../utils/tokenGenerator');

const login = (req, res) => {
    const { email, password } = req.body;

    // console.log(req.body);

    // res.send(req.body);

    Credentials.findOne({
        where: {
            email: email,
        },
    }).then(credential => {
        if (!credential) {
            res.locals.message = 'Login failed';
            res.redirect("/error");
        }

        else if (credential.validPassword(password)) {

            // console.log(credential.dataValues);

            if (credential.isBan) {
                res.locals.message = 'You are banned';
                return res.redirect('/error');
            }

            res.locals.credential = {
                id: credential.id,
                email: credential.email,
                role: credential.role,
            };

            User.findOne({
                where: {
                    cid: credential.id,
                },
            }).then(user => {
                res.locals.user = {
                    id: user.id,
                    name: user.name,
                    photo: user.photo,
                    phone: user.phone,
                    role: user.role,
                };

                const token = tokenGenerator.generateToken(
                    credential.dataValues,
                    user.dataValues
                );

                res.locals.token = token;

                res.cookie('getscouted', token, {
                    maxAge: 12 * 60 * 60 * 1000, // 12 hour
                    httpOnly: true,
                    sameSite: true,
                    secure: true,
                    signed: true,
                });

                // res.send({
                //     message: 'Login success',
                //     token: token,
                //     user: {
                //         id: user.id,
                //         name: user.name,
                //         photo: user.photo,
                //         phone: user.phone,
                //         role: user.role,
                //     },
                // });

                // console.log(user.dataValues);

                if (res.locals.credential.role === 'recruiter') {
                    res.redirect('/recruiter');
                } else if (res.locals.credential.role === 'applicant') {
                    res.redirect('/applicant/');
                } else if (res.locals.credential.role === 'admin') {
                    res.redirect('/admin');
                } else {
                    res.redirect('/error');
                }
            }).catch(err => {
                res.locals.message = 'Login failed';
                res.locals.user = {};
            });
        }
    });
};

const register = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;


    if (password !== confirmPassword) {
        res.status(403);
        res.send({
            message: 'Passwords do not match'
        });
        return;
    }

    await Credentials.findOne({
        where: {
            email: email,
        },
    }).then(credential => {
        if (credential) {
            res.status(403);
            res.send({
                message: 'Email already exists'
            });
            return;
        }

        Credentials.create({
            email,
            password,
            role,
        }).then(credential => {
            // console.log(credential);

            User.create({
                cid: credential.id,
                name: name,
            }).then(user => {
                // res.locals.message = 'Registration success';
                res.status(201);
                res.send({
                    message: 'Registration success'
                });
            });
        });

    }).catch(error => {
        console.log(error);
        res.locals.message = 'Registration failed';
        res.send({
            message: 'Registration failed',
        })

    });
};

const deAuth = (req, res) => {
    let user = res.locals.data.user;

    if (!user) {
        res.session.message = 'You are not logged in';
        res.redirect("/error");
    }

    delete res.session;
    res.clearCookie("getscouted");

    // req.session.message = "Logout Successful!";
    res.redirect("/login");
};

module.exports = {
    login,
    register,
    deAuth,
}
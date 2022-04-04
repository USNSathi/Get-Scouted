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
        }

        else if (credential.validPassword(password)) {

            // console.log(credential.dataValues);

            if (credential.isBan) {
                res.locals.message = 'You are banned';
                return res.redirect('/notice');
            }

            res.locals.credential = {
                id: credential.id,
                email: credential.email,
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

                res.send({
                    message: 'Login success',
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name,
                        photo: user.photo,
                        phone: user.phone,
                        role: user.role,
                    },
                });

                // if (user.role === 'recruiter') {
                //     res.redirect('/recruit');
                // } else if (user.role === 'applicant') {
                //     res.redirect('/apply');
                // } else if (user.role === 'admin') {
                //     res.redirect('/admin');
                // } else {
                //     res.redirect('/notfound');
                // }
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
    let user = req.session.user;

    delete req.session;
    res.clearCookie("getscouted");

    // req.session.message = "Logout Successful!";
    res.redirect("/login");
};

module.exports = {
    login,
    register,
    deAuth,
}
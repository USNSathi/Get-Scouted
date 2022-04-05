const landingPage = (req, res) => {
    const isLogin = res.locals.isLogin;

    res.render('index', { url: '/', title: 'Home', isLogin: isLogin });
};

const aboutPage = (req, res) => {
    const isLogin = res.locals.isLogin;

    res.render('about-us', { url: '/aboutus', title: 'About Us', isLogin: isLogin });
};

const contactPage = (req, res) => {
    const isLogin = res.locals.isLogin;
    res.render('contact-us', { url: '/contact', title: 'Contact Us', isLogin: isLogin });
};

const loginPage = (req, res) => {
    const isLogin = res.locals.isLogin;
    res.render('login', { url: '/login', title: 'Login', isLogin: isLogin });
};

const signupPage = (req, res) => {
    const isLogin = res.locals.isLogin;
    res.render('signup', { url: '/signup', title: 'Signup', isLogin: isLogin });
};

const errorPage = (req, res) => {
    const isLogin = res.locals.isLogin;
    const message = req.session.message ? req.session.message : 'The page you requested was not found';

    res.render('error', { url: '/error', title: 'Error', isLogin: isLogin, message: message });
};


module.exports = {
    landingPage,
    aboutPage,
    contactPage,
    loginPage,
    signupPage,
    errorPage,
}


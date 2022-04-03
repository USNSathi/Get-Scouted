const landingPage = (req, res) => {
    res.render('index', { url: '/', title: 'Home' });
};

const aboutPage = (req, res) => {
    res.render('about-us', { url: '/aboutus', title: 'About Us' });
};

const contactPage = (req, res) => {
    res.render('contact-us', { url: '/contact', title: 'Contact Us' });
};

const loginPage = (req, res) => {
    res.render('login', { url: '/login', title: 'Login' });
};

const signupPage = (req, res) => {
    res.render('signup', { url: '/signup', title: 'Signup' });
};

const candidateProfilePage = (req, res) => {
    res.render('candidate-profile', { url: '/candidate-profile', title: 'Candidate-profile' });
};

module.exports = {
    landingPage,
    aboutPage,
    contactPage,
    loginPage,
    signupPage,
    candidateProfilePage,
}


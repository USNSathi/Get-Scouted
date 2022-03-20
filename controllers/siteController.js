const landingPage = (req, res) => {
    res.sendFile('index.html', { root: './views' });
};

const aboutPage = (req, res) => {
    res.sendFile('about-us.html', { root: './views' });
};

const contactPage = (req, res) => {
    res.sendFile('contact-us.html', { root: './views' });
};

const loginPage = (req, res) => {
    res.sendFile('login.html', { root: './views' });
};

const signupPage = (req, res) => {
    res.sendFile('sign-up.html', { root: './views' });
};

module.exports = {
    landingPage,
    aboutPage,
    contactPage,
    loginPage,
    signupPage,
}


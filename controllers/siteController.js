const landingPage = (req, res) => {
    res.sendFile('Index.html', { root: './views' });
};

const aboutPage = (req, res) => {
    res.send('about page');
};

module.exports = {
    landingPage,
    aboutPage,
}


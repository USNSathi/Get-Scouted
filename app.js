// const http = require('http');
const path = require('path');
const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");

const siteRoutes = require('./routes/siteRoutes');


const config = require("./config/server.config");
const port = process.env.PORT || config.PORT;

// const server = http.createServer(
//     (req, res) => {
//         console.log(req.headers);
//         res.end('Hello World');
//     }
// );

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET || config.COOKIE_SECRET));
app.use(
    session({
        secret: process.env.COOKIE_SECRET || config.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
        },
    })
);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// express configuration
app.use(express.static('assets'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/', siteRoutes.router);

// server.listen(port);
app.listen(8000);

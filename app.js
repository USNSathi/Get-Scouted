// const http = require('http');
const path = require('path');
const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const routes = require('./routes');
const fileUpload = require('./middlewares/fileUploadMiddleware');



const Sequelize = require("./models/index").Sequelize;

const config = require("./config/server.config");
const port = process.env.PORT || config.PORT;

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET || config.COOKIE_SECRET));

app.use(
    session({
        secret: process.env.SESSION_SECRET || config.SESSION_SECRET,
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
app.set('view engine', 'ejs');

// file upload for images and pdf
app.use(
    multer({
        storage: fileUpload.imageCheck,
        limits: {
            fileSize: 1024 * 1024 * 2,
        },
    }).single("photo")
);

app.use(
    multer({
        storage: fileUpload.pdfCheck,
        limits: {
            fileSize: 1024 * 1024 * 2,
        },
    }).single("pdf")
)

app.use('/', routes);

Sequelize.sync({
    force: false,
})
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch((error) => {
        if (error.message.includes("Unknown database")) {
            console.log("Create Database Manually");
        }
    });

app.listen(port);

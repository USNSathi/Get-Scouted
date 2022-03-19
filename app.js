// const http = require('http');
const express = require('express');
const path = require('path');

const siteRoutes = require('./routes/siteRoutes');


const port = 8000;

// const server = http.createServer(
//     (req, res) => {
//         console.log(req.headers);
//         res.end('Hello World');
//     }
// );

const app = express();

// express configuration
app.use(express.static('assets'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/', siteRoutes.router);

// server.listen(port);
app.listen(8000);

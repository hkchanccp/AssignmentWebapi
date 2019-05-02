require('dotenv').config();
global.__basedir = __dirname;


/* Modules */
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const axios = require('axios');


/* MongoDB + Mongoose */
const dbConfig = {
    url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_CLUSTER}`,
    options: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
}
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, dbConfig.options)
    .then(() => console.log('MongoDB Connected.'))
    .catch((err) => console.error(err.stack || err));


/* Gerenal Setup */
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.options('*', cors())
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const routes = require('./routes');
app.use('/', routes);
app.use('/', express.static(path.join(__dirname, '../public'), {maxAge: '1d'}));


/* Error Handler (404) */
app.get('*', (req, res) => {
    res.status(404).sendFile(`${__basedir}/views/index.html`);
});


/* Http Server */
http.createServer(app)
    .listen(port, () => {
        console.info(`HTTP server started on port ${port}`);
    })
    .on('error', (err) => {
        console.error(err.stack || err);
    });

process.on('uncaughtException', (err) => {
    if (err.name === 'MongoError') {
        mongoose.connection.on('error', err);
    } else {
        console.error(err.stack || err);
    }
});


module.exports = app;
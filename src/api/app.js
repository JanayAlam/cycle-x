require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const routes = require('./routers');
const errorHandler = require('./errors');
require('./middlewares').passportConfig();

// some needed middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/static', express.static('public'))

// routes
routes(app);

// error handler
errorHandler(app);

module.exports = app;

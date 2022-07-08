require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const routes = require('./routers');
const errorHandler = require('./errors');

// some needed middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// routes
routes(app);

// error handler
errorHandler(app);

module.exports = app;

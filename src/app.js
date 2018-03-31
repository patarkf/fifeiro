const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const routes = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use('/', routes);

module.exports = app;

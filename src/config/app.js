const dotenv = require('dotenv');
const { urlNotFound } = require('../middlewares');

dotenv.config();

const express = require('express');
const APIv1 = require('../routes');
const { morgan } = require('../middlewares');

const app = express();

app.set('json spaces', 2);
app.use(express.json());
app.use(morgan);

app.use('/api/v1', APIv1);

// Response for every other route not specified
app.all('*', urlNotFound);

module.exports = app;

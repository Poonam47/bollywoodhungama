'use strict';
var config = require('./config.json');

Object.keys(config).forEach((key) => {
    process.env[key] = JSON.stringify(config[key]);
});
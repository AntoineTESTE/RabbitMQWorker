'use strict';

global._ = require('lodash');
global.logger = require('winston');
global.config = require('./config')(logger);


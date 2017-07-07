'use strict';

module.exports = () => {
  const models = require('./models')();
  const server = require('./server')();
  const services = require('services')();
  require('./worker')(server, models, services);
}

'use strict';

module.exports = () => {
  const models = require('./models')();
  const server = require('./server')
  require('./worker')(server, models);
}

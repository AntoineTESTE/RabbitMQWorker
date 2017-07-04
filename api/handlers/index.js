'use strict';

module.exports = (services) => {
  require('./worker.handler')(services.rMqService)
};

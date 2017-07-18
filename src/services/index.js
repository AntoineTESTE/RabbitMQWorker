'use strict';

module.exports = () => {
  return require('./RabbitMQService')().then(RabbitMQService => {
    return { RabbitMQService };
  });
};

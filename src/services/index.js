'use strict';

module.exports = () => {
  return require('./rabbitMqReceiveService')().then(RabbitMQService => {
    return { RabbitMQService };
  });
};

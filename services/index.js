'use strict';

module.exports = () => {
  return {
    rMqService: require('./rabbitMqReceiveService')()
  }
};

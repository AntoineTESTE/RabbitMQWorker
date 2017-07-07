'use strict';

const queue = config.amqp.queue;
const amqp = require('amqplib');
let channel;

module.exports = () => {
  return {
    connect() {
      return amqp.connect(config.amqp.connectionString)
        .then(conn => {
          return conn.createChannel();
        })
        .then(ch => {
          channel = ch;
        });
    },

    consume(onMessage) {
      channel.consume(queue, onMessage);
    }
  };
};

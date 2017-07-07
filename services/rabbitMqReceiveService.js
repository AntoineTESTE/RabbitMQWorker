'use strict';

const queue = config.amqp.queue
const amqp = require('amqplib/callback_api');
let channel;

module.exports = () => {
  return {
    connect() {
      amqp.connect(config.amqp.connectionString)
        .then(conn => {
          return conn.createChannel();
        })
        .then(ch => {
          channel = ch;
        });
    },

    consume(onMessage) {
      channel.consume(QUEUE_NAME, onMessage);
    }
  };
}
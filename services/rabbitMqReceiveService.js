'use strict';

const queue = config.amqp.queue;
const amqp = require('amqplib');
let channel;

module.exports = () => {
  return {
    // connect
    connect() {
      return amqp.connect(config.amqp.connectionString)
        .then(conn => {
          return conn.createChannel();
        })
        .then(ch => {
          channel = ch;
        });
    },
    // consume
    consume(onMessage) {
      channel.consume(queue, onMessage);
    },
    // acknowlegment
    ack(msg) {
      channel.ack(msg);
    }
  };
};

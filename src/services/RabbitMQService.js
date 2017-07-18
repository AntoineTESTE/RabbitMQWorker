'use strict';

const amqp = require('amqplib');
const { queue, connectionString } = config.amqp;

module.exports = () => {
  return amqp.connect(connectionString)
    .then(conn => conn.createChannel())
    .then(channel => {
      return {
        consume(onMessage) {
          channel.consume(queue, onMessage);
        },
        ack(msg) {
          channel.ack(msg); // acknowledge the message
        }
      };
    });
};

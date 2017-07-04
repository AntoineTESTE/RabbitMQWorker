'use strict';

module.exports = () => {

  return {

    receiveMessage(routingKey, queue, ch) {
      const amqp = require('amqplib/callback_api');
      amqp.connect(routingKey, function (err, conn) {
        if (err) throw err;
        consumer(conn);

      });

      // Emission
      const consumer = (conn) => {
        conn.createChannel((err, ch) => {
          if (err) throw err;
          ch.assertQueue(queue);
          // ch.prefetch(1); // Dispatch if (1) msg have not receive ack
          ch.consume(queue, (msg) => {
            console.log("msg.content.toString():", JSON.parse(msg.content.toString()));
            ch.ack(msg);
          });
        });
      }
    }
  }
}
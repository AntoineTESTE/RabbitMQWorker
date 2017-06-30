'use strict';

const amqp = require('amqplib/callback_api');
const routingKey = '';

module.exports = () => {

  return {
    // Connexion
    conn(amqp) {
      amqp.connect(routingKey, function (err, conn) {
        if (err) throw err;
        consumer(conn);
      });
    },


    //Emission
    consumer(conn) {
      const q = '';
      conn.createChannel((err, ch) => {
        if (err) throw err;
        ch.assertQueue(q);
        // ch.prefetch(1); // Dispatch if (1) msg have not receive ack
        ch.consume(q, (msg) => {
          console.log("msg.content.toString():", JSON.parse(msg.content.toString()));
          ch.ack(msg);

        });
      });
    }
  }
}
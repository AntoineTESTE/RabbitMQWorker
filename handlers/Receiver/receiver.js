'use strict';

// export des méthodes
module.exports = (rabbitMqReceiverServices) => {

  return {

    Sendmessage(amqp) {
      const routingKey = ''
      amqp.connect(routingKey, function (err, conn) {
        if (err) throw err;
        send(conn);
      });
    },

    send(conn) {
      conn.createChannel((err, ch) => {
        if (err) throw err;
        ch.assertQueue(QUEUE);
        send(q) {
          console.log('sending');
          const message = { a: 1 };
          ch.publish(EXCHANGE, routingKey, new Buffer(JSON.stringify(message)));
        }

      });

    },
  }
}

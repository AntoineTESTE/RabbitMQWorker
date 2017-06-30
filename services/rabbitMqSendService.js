'use strict';

const amqp = require('amqplib/callback_api');
const routingKey = '';
const q = '';  //non-durable queue with a generated name:


module.exports = () => {

  return {
    // Connexion
    conn(amqp) {
      amqp.connect(routingKey, function (err, conn) {
        if (err) throw err;
        publisher(conn);
      });
    },

    //Emission
    publisher(conn) {

      conn.createChannel((err, ch) => {
        if (err) throw err;
        ch.assertQueue(q);
        ch.sendToQueue(q, new Buffer(msg));
        exchange(ch);
      });
    },

    // Exchange
    exchange(ch) {
      const ExchangeName = '';
      ch.assertExchange(ExchangeName, new Buffer(msg));
      ch.publish(EXCHANGE, routingKey, new Buffer(JSON.stringify(msg)));
    }
  }
}


msg = 'MESSAGE EN GRAS';
exchange = 'EXCHANGE DE LA MORT'


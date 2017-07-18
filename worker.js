'use strict';
require('./bootstrap');

require('./src')().then(({ services, models }) => {
    return services.RabbitMQ.consume(msg => {
      const content = JSON.parse(msg.content);
      models.MessageModel.save(content)
        .then(createdMessage => {
          console.log(`saved ${JSON.stringify(createdMessage)}`);
          services.RabbitMQ.ack(msg);
        })
        .catch(err => {
          console.error(`error saving message, message: ${JSON.stringify(msg)}, reason: ${err}`);
        });
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

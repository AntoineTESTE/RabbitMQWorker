'use strict';

require('./bootstrap');

const services = require('./services')();
const models = require('./models')();

services.rMqService.connect()
  .then(() => {
    console.log('Server running at:', config.server.port);
    return services.rMqService.consume(msg => {
      models.MessageModel.save(msg)
        .then(createdMessage => {
          console.log(`well done, saved ${createdMessage} in database, so cool!`);
        });
    });
  })
  .catch(err => {
    // do not start in an unstable state
    console.error(err);
  });


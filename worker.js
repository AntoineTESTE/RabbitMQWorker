'use strict';

const _ = require('lodash');
require('./bootstrap');

const services = require('./services')();
const models = require('./models')();


services.rMqService.connect()
  .then(() => {
    // connect
    console.log('Server is running on port :', config.server.port);
    return services.rMqService.consume(msg => {
      // parse
      const content = JSON.parse(msg.content);
      // date
      console.log(content);
      // save
      return models.MessageModel.save(content)
        .then(createdMessage => {
          console.log(`Your content have been saved in database!`);
          // acknowlegement
          services.rMqService.ack(msg);
        });
    });
  })
  .catch(err => {
    console.error(err);
  });


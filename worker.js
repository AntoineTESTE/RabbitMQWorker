'use strict';

require('./bootstrap');

const services = require('./services')();
const models = require('./models')();
const uuidv4 = require('uuid/v4');


services.rMqService.connect()
  .then(() => {
    // connect
    console.log('Server is running on port :', config.server.port);
    return services.rMqService.consume(msg => {
      // parse
      const content = JSON.parse(msg.content);
      console.log(content);
      // save
      return models.MessageModel.save(content)
        .then(createdMessage => {
          console.log(`well done, your content have been saved in database!`);
          // acknowlegement
          services.rMqService.ack(msg);
        })
    });
  })
  .catch(err => {
    console.error(err);
  });


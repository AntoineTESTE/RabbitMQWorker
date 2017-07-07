'use strict';

const { rMqService } = require('./services')();
const { MessageModel } = require('./models')();


rMqService.connect()
  .then(() => {
    return rMqService.consume(msg => {
      MessageModel.save(msg)
        .then(createdMessage => {
          console.log(`well done, saved ${createdMessage} in database, so cool!`);
        });
    });
  })
  .catch(err => {
    // do not start in an unstable state
    console.error(err);
  })




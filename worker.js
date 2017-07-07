'use strict';

module.exports = (services, models) => {
  services.rMqService.connect()
    .then(() => {
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
};


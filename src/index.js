'use strict';

module.exports = () => {
  return Promise.all([
    services: require('./services')(),
    models: require('./models')()
  ]).then(resolvedPromised => {
    return {
      services: resolvedPromised.services,
      models: resolvedPromised.models
    }
  });
};

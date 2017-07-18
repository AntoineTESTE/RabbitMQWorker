'use strict';

module.exports = () => {
  return Promise.all([
    require('./services')(),
    require('./models')()
  ]).then(([services, models]) => {
    return { services, models };
  });
};

'use strict';

const massive = require('massive');

module.exports = () => {
  return massive(config.postgres).then(db => {
    return {
      save(msg) {
        return db.message.insert(msg); // saving in database
      }
    };
  });
};

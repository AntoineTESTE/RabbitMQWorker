'use strict';

const massive = require('massive');
let db;

// Postgre connection
massive(config.postgres).then(_db => {
  db = _db;
}).catch(err => {
  console.error(`Cannot connect to postgres, reason: ${err}`);
});

module.exports = () => {
  return {
    save(msg) {
      // saving in database
      return db.message.insert(msg);
    }
  };
};

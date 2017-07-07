'use strict';


const massive = require('massive');
let db;

massive(config.postgres).then(_db => {
  db = _db;
});


module.exports = () => {
  return {
    save(msg) {
      return db.save(msg);
    }
  };
};

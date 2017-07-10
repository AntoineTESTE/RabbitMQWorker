'use strict';


const massive = require('massive');
let db;

massive(config.postgres).then(_db => {
  db = _db;
}).catch(err => {
  console.error(`cannot connect to postgres, reason: ${err}`);
});


module.exports = () => {
  return {
    save(msg) {
      console.log(db);
      console.log(db.tables);
      return db.message.save(msg);
    }
  };
};

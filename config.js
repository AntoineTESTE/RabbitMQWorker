'use strict';

module.exports = (logger) => {
  return require('common-env/withLogger')(logger).getOrElseAll({
    postgres: {
      host: '127.0.0.1',
      port: 5432,
      database: 'messages',
      user: 'postgres',
      password: 'apppwd'
    },
    amqp: {
      connectionString: 'amqp://ldcfpqsj:_zoKJjBqqOqVBOwJWx32rxv-FjNNjPeP@penguin.rmq.cloudamqp.com/ldcfpqsj',
      queue: 'receiver'
    }
  });
};

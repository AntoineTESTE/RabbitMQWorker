'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');



// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8001
});

const options = {
  info: {
    'title': 'Test API Documentation',
    'version': '1.0',
  }
};

server.register([
  Inert,
  Vision,
  {
    'register': HapiSwagger,
    'options': options
  }], (err) => {
    server.start((err) => {
      if (err) {
        console.log(err);
      } else {
        const services = require('./services')();
        require('./api')(services, server);
        console.log('Server running at:', server.info.uri);
      }
    });
  });



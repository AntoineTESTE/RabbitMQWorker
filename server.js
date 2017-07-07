'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
require('./bootstrap');


// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: config.server.port
});

const options = {
  info: {
    title: 'Test API Documentation',
    version: '1.0',
  }
};

server.register([
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: options
  }], (err) => {
  server.start((err) => {
      if (err) {
        console.log(err);
      } else {
        const services = require('./services')();
        const models = require('./models')();
        require('./worker')(services, server, models);
        console.log('Server running at:', server.info.uri);
      }
    });
});


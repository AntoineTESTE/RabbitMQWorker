'use strict';

const http = require('http');
const express = require('express');
const app = express();


module.exports = (rMqService) => {
  const queue = 'receiver';
  const routingKey = 'amqp://ldcfpqsj:_zoKJjBqqOqVBOwJWx32rxv-FjNNjPeP@penguin.rmq.cloudamqp.com/ldcfpqsj';
  const ch = '';
  rMqService.receiveMessage(routingKey, queue, ch);
}
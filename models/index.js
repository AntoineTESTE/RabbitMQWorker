'use strict';

module.exports = () => {
  return {
    MessageModel: require('./messages')()
  }
}
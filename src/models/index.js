'use strict';

module.exports = () => {
  return require('./messages')().then(MessageModel => {
    return { MessageModel };
  });
}

const {WebSocket} = require('ws');
const path = require('path');
const logger = require('./logger');

const createSocket = (connectionUrl, listenKey) => {
  const socket = new WebSocket(path.join(connectionUrl, listenKey));
  return socket;
}


const subscribeTo = (socket, streams, id) =>
  socket.send(JSON.stringify({ method: 'SUBSCRIBE', params: streams, id: id }));



const monitorStreams = (socket, onMessage) => {
  socket.on('open', () => {
    logger.info('Monitor Socket', 'Socket opened');
  });

  socket.on('close', () => {
    logger.info('Monitor Socket', 'Socket closed');
  });

  socket.on('error', (error) => {
    logger.error('Monitor Socket', 'Socket error', error);
  });

  socket.on('message', (data) => {
    const response = JSON.parse(data);
    onMessage(response);
  });
}


  
module.exports = {
  createSocket,
  subscribeTo,
  monitorStreams,
}
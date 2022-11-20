const { createSocket, subscribeTo, monitorStreams } = require('../lib/webSockets');
const { getListenKey, refreshListenKey } = require('../lib/request');
const logger = require('../lib/logger');
const { updateMetrics, logMetrics } = require('../lib/metrics');



const setup = async (config) => {
  try {
    const listenKey = await getListenKey(config);
    const socket = createSocket(config.STREAM_URL, listenKey);
    socket.on('open', () => {
      subscribeTo(socket, config.STREAM_IDS, 1);
    });
    monitorStreams(socket, updateMetrics);

    refreshListenKey(listenKey, config);

    logMetrics(config.LOG_INTERVAL);
    
  } catch (error) {
    logger.error('Stream Service', 'Error setting up stream', error);

    
  }
}


module.exports = {
  setup
}
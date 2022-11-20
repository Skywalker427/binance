const axios = require('axios');
const logger = require('./logger');

const getListenKey = async (config) => {
  const response = await axios.post(config.LISTEN_KEY_URL, null, {
    headers: {
      'X-MBX-APIKEY': config.API_KEY
      }
    }
  );
  logger.debug('Get Listen Key', 'Listen key received')
  return response.data.listenKey;
}

const refresh = async (listenKey,config) => {
  const response = await axios.put(`${config.LISTEN_KEY_URL}/listenKey=${listenKey}`, null, {
    headers: {
      'X-MBX-APIKEY': config.API_KEY
      }
    }
  );
  return response.data.listenKey;
}

const refreshListenKey = async (listenKey, config) => {
  setInterval(async () => {
    await refresh(listenKey,config);
    logger.debug('Refresh Listen Key', 'Refreshed listen key');
  }, config.KEY_REFRESH_INTERVAL);

  logger.debug('Refresh Listen Key', 'Listen key will be refreshed in', `${config.KEY_REFRESH_INTERVAL/(1000 * 60)}mins`);
}


module.exports = {
  getListenKey,
  refreshListenKey
}